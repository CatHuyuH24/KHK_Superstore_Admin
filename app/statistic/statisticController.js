const statisticsService = require('./statisticService');

    const getStatistics = async (req, res) => {
        
        var dateSelected = req.query.date;
    if (!dateSelected) {
        dateSelected = new Date().toISOString().split('T')[0]; 
    }
   

    const year = dateSelected.split('-')[0]; 
    
    try {
        // const { revenueData, topProductsData } = await statisticsService.getStatisticsData(date, timeUnit);
        const{topDay, topMonth, topYear}=await statisticsService.getTop5SellerProduct(dateSelected);

        const sale=await statisticsService.getSalesByCategory(year);
        const saleCategoryData = processData(sale);

        const revenue=await statisticsService.getMonthlyRevenue(year);
  
        const response={
            topDay:topDay,
            topMonth:topMonth,
            topYear:topYear,
            saleCategoryData:saleCategoryData,
            revenue:revenue,
            dateSelected:dateSelected
        }
        if (req.xhr) {
            return res.json(response);
        }
        return res.render('statistic',response);

    } catch (error) {
        console.error('Error render statistic page:', error);
        res.status(500).send('Something went wrong'); // Đảm bảo có thông báo lỗi rõ ràng
    }
};


const processData = (rawData) => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1); 
    const categories = [...new Set(rawData.map(item => item.category))]; 
  
    const chartData = [['Month', ...categories]];

    months.forEach(month => {
      const row = [month]; 
      categories.forEach(category => {
        const item = rawData.find(data => data.month === month && data.category === category);
        row.push(item ? parseInt(item.total_sold) : 0);
      });
      chartData.push(row);
    });
  
    return chartData;
  };
  


module.exports = {
    getStatistics
};
