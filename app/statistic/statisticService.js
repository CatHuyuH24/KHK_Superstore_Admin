const pool = require('../../config/database');
const getTop5SellerProduct = async (date) => {
    try {
        const topProductsDayQuery = `
            SELECT 
                p.name, 
                SUM(od.quantity) AS total_sold
            FROM orders_detail od
            JOIN products p ON od.product_id = p.id
            JOIN orders o ON o.order_id=od.order_id
            WHERE o.created_at::date = $1::date
            GROUP BY p.name
            ORDER BY total_sold DESC
            LIMIT 5
        `;

        const topProductsMonthQuery = `
            SELECT 
                p.name, 
                SUM(od.quantity) AS total_sold
            FROM orders_detail od
            JOIN products p ON od.product_id = p.id
            JOIN orders o ON o.order_id=od.order_id
            WHERE EXTRACT(MONTH FROM o.created_at) = EXTRACT(MONTH FROM $1::date)
              AND EXTRACT(YEAR FROM o.created_at) = EXTRACT(YEAR FROM $1::date)
            GROUP BY p.name
            ORDER BY total_sold DESC
            LIMIT 5
        `;

        const topProductsYearQuery = `
            SELECT 
                p.name, 
                SUM(od.quantity) AS total_sold
            FROM orders_detail od
            JOIN products p ON od.product_id = p.id
            JOIN orders o ON o.order_id=od.order_id
            WHERE EXTRACT(YEAR FROM o.created_at) = EXTRACT(YEAR FROM $1::date)
            GROUP BY p.name
            ORDER BY total_sold DESC
            LIMIT 5
        `;

        const [topProductsDayData, topProductsMonthData, topProductsYearData] = await Promise.all([
            pool.query(topProductsDayQuery, [date]),
            pool.query(topProductsMonthQuery, [date]),
            pool.query(topProductsYearQuery, [date])
        ]);

        const topDay = topProductsDayData.rows.map(row => ({
            name: row.name,
            quantity: row.total_sold
        }));

        const topMonth = topProductsMonthData.rows.map(row => ({
            name: row.name,
            quantity: row.total_sold
        }));

        const topYear = topProductsYearData.rows.map(row => ({
            name: row.name,
            quantity: row.total_sold
        }));

        // Trả về kết quả
        return {
            topDay,
            topMonth,
            topYear
        };

    } catch (error) {
        console.error("Error fetching statistics from db", error);
    }
};

const getSalesByCategory = async (year) => {
    try {
        const salesByCategoryQuery = `
            WITH categories_list AS (
                SELECT category_name FROM categories
            ),
            monthly_sales AS (
                SELECT 
                    EXTRACT(MONTH FROM o.created_at) AS month,
                    c.category_name,
                    SUM(od.quantity) AS total_sold
                FROM 
                    orders o
                JOIN orders_detail od ON o.order_id = od.order_id
                JOIN products p ON od.product_id = p.id
                JOIN categories c ON p.category_id = c.id
                WHERE EXTRACT(YEAR FROM o.created_at) = $1
                GROUP BY EXTRACT(MONTH FROM o.created_at), c.category_name
            ),
            months AS (
                SELECT generate_series(1, 12) AS month
            )
            SELECT 
                m.month,
                c.category_name,
                COALESCE(ms.total_sold, 0) AS total_sold
            FROM 
                months m
            CROSS JOIN categories_list c
            LEFT JOIN monthly_sales ms ON ms.month = m.month AND ms.category_name = c.category_name
            ORDER BY m.month, c.category_name;
        `;

        // Thực thi câu truy vấn
        const salesData = await pool.query(salesByCategoryQuery, [year]);

        // Xử lý dữ liệu và trả về kết quả
        const sales = salesData.rows.map(row => ({
            category: row.category_name,
            month: row.month,
            total_sold: row.total_sold
        }));

        return sales;

    } catch (error) {
        console.error("Error fetching sales data from db", error);
    }
};


const getMonthlyRevenue = async (selectedYear) => {
    try {
        const monthlyRevenueQuery = `
            WITH months AS (
                SELECT generate_series(1, 12) AS month
            ),
            monthly_revenue AS (
                SELECT 
                    EXTRACT(MONTH FROM created_at) AS month, 
                    SUM(total) AS revenue
                FROM 
                    orders
                WHERE 
                    EXTRACT(YEAR FROM created_at) = $1
                GROUP BY 
                    EXTRACT(MONTH FROM created_at)
            )
            SELECT 
                m.month, 
                COALESCE(mr.revenue, 0) AS revenue
            FROM 
                months m
            LEFT JOIN monthly_revenue mr ON m.month = mr.month
            ORDER BY 
                m.month;
        `;

        const revenueData = await pool.query(monthlyRevenueQuery, [selectedYear]);

        const monthlyRevenues = revenueData.rows.map(row => ({
            month: row.month,
            revenue: row.revenue
        }));

        return monthlyRevenues;

    } catch (error) {
        console.error("Error fetching monthly revenue from db", error);
        throw error;
    }
};



module.exports = {
    getTop5SellerProduct,
    getSalesByCategory,
    getMonthlyRevenue
};
