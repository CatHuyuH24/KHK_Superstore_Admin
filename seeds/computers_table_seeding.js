/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("computers").del();
  await knex("computers").insert([
    {
      name: "Macbook Air M2",
      brand: "Apple",
      price: 899,
      imageurl:
        "https://cdn.hoanghamobile.com/i/content/Uploads/2024/09/09/macbook-air-13-in-m3-chip-starlight-pure-front-screen-usen.jpg",
      detail: `$$
        Apple Macbook Air M2 {2022} 13 inch 8-Core CPU/8-Core GPU 256GB SSD 8GB Ram Starlight
        \nSTRIKINGLY THIN DESIGN - The redesigned MacBook Air is more portable than ever and weighs just 2.7 pounds. It's the incredibly capable laptop that lets you work, play or create just about anything - anywhere.
        \nSUPERCHARGED BY M2 - Get more done faster with a next-generation 8-core CPU, up to 10-core GPU and up to 24GB of unified memory.
        \nUP TO 18 HOURS OF BATTERY LIFE - Go all day and into the night, thanks to the power-efficient performance of the Apple M2 chip.
        \nBIG, BEAUTIFUL DISPLAY - The 13.6-inch Liquid Retina display features over 500 nits of brightness, P3 wide color and support for 1 billion colors for vibrant images and incredible detail.
        \nADVANCED CAMERA AND AUDIO - Look sharp and sound great with a 1080p FaceTime HD camera, three-mic array and four-speaker sound system with Spatial Audio.
        $$`,
      discount: 0,
    },
    // {
    //   name: "Macbook Pro 14 M2",
    //   brand: "Apple",
    //   price: 1699,
    //   type_id: 1,
    //   imageurl:
    //     "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2023/02/28/mabookpro14-silver-1.png",
    //   detail: `$$
    //     Restored Apple Macbook Pro M2 Pro 12-Core CPU 19-Core GPU 14-inch 2023 Gray 1TB SSD 16GB Ram
    //     \nThis product may not have been manufacturer certified but has been professionally inspected, tested and cleaned by Walmart Restored Program Sellers and Suppliers.
    //     \nFully functional product in Like New Condition. Item may have very light micro-scratches, invisible at a distance of 8-12 inches {arm’s length}.
    //     \nThis product may include accessories which might not be original but will be compatible and fully functional.
    //     \nThis product may be returned within 90 days for free return or replacement if you are not satisfied.
    //     \nBattery capacity exceeds 80% capacity relative to its new equivalent.
    //     $$`,
    //   discount: 10,
    // },
    // {
    //   name: "Macbook Pro 16 M2 (16/256)",
    //   brand: "Apple",
    //   price: 1999,
    //   type_id: 1,
    //   imageurl:
    //     "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2024/11/05/macbook-pro-14-inch-m4-max-den-1.png",
    //   detail: `$$
    //     M2 Max brings power to take on even more demanding projects.
    //     \nStunning 16-inch Liquid Retina XDR display with extreme dynamic range and contrast ratio
    //     \nM2 Max chip for exceptional speed and power
    //     \n12-core CPU to fly through pro workflows quicker than ever
    //     \n38-core GPU for graphics-intensive apps and games
    //     \n64GB of unified memory makes everything you do fast and fluid
    //     \nUp to 18 hours of battery life
    //     \n8TB of superfast SSD storage launches apps and opens files in an instant
    //     \n1080p FaceTime HD camera
    //     \nSix-speaker sound system with force-cancelling woofers
    //     \nStudio-quality three-microphone array captures your voice more clearly
    //     \nThree Thunderbolt 4 ports, HDMI port, SDXC card slot, headphone jack, MagSafe charging port
    //     \nWi-Fi 6E wireless connectivity for up to 2x faster throughput
    //     \nBacklit Magic Keyboard with Touch ID for secure unlock and payments
    //     \nmacOS Ventura gives you powerful new ways to get more done, share, and collaborate—across all your Apple devices
    
    //     \nIn The Box
    //     \n-16-inch MacBook Pro
    //     \n-140W USB-C Power Adapter
    //     \n-USB-C to MagSafe 3 Cable {2 m}
    //     \n64 GB Memory
    //     \nSolid State Drive Capacity 8 TB
    //     \nConfigure To Order {Factory Upgraded from Base Spec}
    //     $$`,
    //   discount: 30,
    // },
    // {
    //   name: "Macbook M2",
    //   brand: "Apple",
    //   price: 1399,
    //   type_id: 1,
    //   imageurl:
    //     "https://i5.walmartimages.com/asr/d03ec3d9-4695-494f-b01d-891c447c26c5.d5e6614d71a17b27cb22d27fa8f00601.jpeg",
    //   detail: `$$
    //     M2  brings power to take on even more demanding projects.
    //     \nStunning 13.6-inch Liquid Retina XDR display with extreme dynamic range and contrast ratio
    //     \nM2 chip for exceptional speed and power
    //     \n10-core CPU to fly through pro workflows quicker than ever
    //     \n10-core GPU for graphics-intensive apps and games
    //     \n64GB of unified memory makes everything you do fast and fluid
    //     \nUp to 18 hours of battery life
    //     \n8TB of superfast SSD storage launches apps and opens files in an instant
    //     \n1080p FaceTime HD camera
    //     \nSix-speaker sound system with force-cancelling woofers
    //     \nStudio-quality three-microphone array captures your voice more clearly
    //     \nThree Thunderbolt 4 ports, HDMI port, SDXC card slot, headphone jack, MagSafe charging port
    //     \nWi-Fi 6E wireless connectivity for up to 2x faster throughput
    //     \nBacklit Magic Keyboard with Touch ID for secure unlock and payments
    //     \nmacOS Ventura gives you powerful new ways to get more done, share, and collaborate—across all your Apple devices
    
    //     \nIn The Box
    //     \n-13.6-inch MacBook Pro
    //     \n-64W USB-C Power Adapter
    //     \n-USB-C to MagSafe 3 Cable {2 m}
    //     \n16 GB Memory
    //     \nSolid State Drive Capacity 8 TB
    //     \nConfigure To Order {Factory Upgraded from Base Spec}
    //     $$`,
    //   discount: 0,
    // },
    // {
    //   name: "Macbook Pro 16 M1 Max",
    //   brand: "Apple",
    //   price: 2499,
    //   type_id: 1,
    //   imageurl:
    //     "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2021/10/19/gray-macbook-2021-3.png",
    //   detail: `$$
    //     M2  brings power to take on even more demanding projects.
    //     \nStunning 13.6-inch Liquid Retina XDR display with extreme dynamic range and contrast ratio
    //     \nM2 chip for exceptional speed and power
    //     \n10-core CPU to fly through pro workflows quicker than ever
    //     \n10-core GPU for graphics-intensive apps and games
    //     \n64GB of unified memory makes everything you do fast and fluid
    //     \nUp to 18 hours of battery life
    //     \n8TB of superfast SSD storage launches apps and opens files in an instant
    //     \n1080p FaceTime HD camera
    //     \nSix-speaker sound system with force-cancelling woofers
    //     \nStudio-quality three-microphone array captures your voice more clearly
    //     \nThree Thunderbolt 4 ports, HDMI port, SDXC card slot, headphone jack, MagSafe charging port
    //     \nWi-Fi 6E wireless connectivity for up to 2x faster throughput
    //     \nBacklit Magic Keyboard with Touch ID for secure unlock and payments
    //     \nmacOS Ventura gives you powerful new ways to get more done, share, and collaborate—across all your Apple devices
    
    //     \nIn The Box
    //     \n-13.6-inch MacBook Pro
    //     \n-64W USB-C Power Adapter
    //     \n-USB-C to MagSafe 3 Cable {2 m}
    //     \n16 GB Memory
    //     \nSolid State Drive Capacity 8 TB
    //     \nConfigure To Order {Factory Upgraded from Base Spec}
    //     $$`,
    //   discount: 0,
    // },
    // {
    //   name: "Macbook Pro 13",
    //   brand: "Apple",
    //   price: 1699,
    //   type_id: 1,
    //   imageurl:
    //     "https://macfinder.co.uk/wp-content/uploads/2019/10/img-MacBook-Pro-Retina-13-Inch-94944.jpg",
    //   detail: `$$
    //     Pro Retina  brings power to take on even more demanding projects.
    //     \nStunning 13.6-inch Liquid Retina XDR display with
    //     \nM2 chip for exceptional speed and power
    //     \n10-core CPU to fly through pro workflows quicker than ever
    //     \n10-core GPU for graphics-intensive apps and games
    //     \n64GB of unified memory makes everything you do fast and fluid
    //     \nUp to 18 hours of battery life
    //     \n8TB of superfast SSD storage launches apps and opens files in an instant
    //     \n1080p FaceTime HD camera
    //     \nSix-speaker sound system with force-cancelling woofers
    //     \nStudio-quality three-microphone array captures your voice more clearly
    //     \nThree Thunderbolt 4 ports, HDMI port, SDXC card slot, headphone jack, MagSafe charging port
    //     \nWi-Fi 6E wireless connectivity for up to 2x faster throughput
    //     \nBacklit Magic Keyboard with Touch ID for secure unlock and payments
    //     \nmacOS Ventura gives you powerful new ways to get more done, share, and collaborate—across all your Apple devices
    
    //     \nIn The Box
    //     \n-13.6-inch MacBook Pro
    //     \n-64W USB-C Power Adapter
    //     \n-USB-C to MagSafe 3 Cable {2 m}
    //     \n16 GB Memory
    //     \nSolid State Drive Capacity 8 TB
    //     \nConfigure To Order {Factory Upgraded from Base Spec}
    //     $$`,
    //     discount: 10,
    // },
    // {
    //   name: "Macbook Air M3",
    //   brand: "Apple",
    //   price: 1699,
    //   type_id: 1,
    //   imageurl:
    //     "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2024/09/21/air-m3-15-inch-xanh-den-1.png",
    //   detail: `$$
    //     M2  brings power to take on even more demanding projects.
    //     \nStunning 13.6-inch Liquid Retina XDR display with extreme dynamic range and contrast ratio
    //     \nM2 chip for exceptional speed and power
    //     \n10-core CPU to fly through pro workflows quicker than ever
    //     \n10-core GPU for graphics-intensive apps and games
    //     \n64GB of unified memory makes everything you do fast and fluid
    //     \nUp to 18 hours of battery life
    //     \n8TB of superfast SSD storage launches apps and opens files in an instant
    //     \n1080p FaceTime HD camera
    //     \nSix-speaker sound system with force-cancelling woofers
    //     \nStudio-quality three-microphone array captures your voice more clearly
    //     \nThree Thunderbolt 4 ports, HDMI port, SDXC card slot, headphone jack, MagSafe charging port
    //     \nWi-Fi 6E wireless connectivity for up to 2x faster throughput
    //     \nBacklit Magic Keyboard with Touch ID for secure unlock and payments
    //     \nmacOS Ventura gives you powerful new ways to get more done, share, and collaborate—across all your Apple devices
    
    //     \nIn The Box
    //     \n-13.6-inch MacBook Pro
    //     \n-64W USB-C Power Adapter
    //     \n-USB-C to MagSafe 3 Cable {2 m}
    //     \n16 GB Memory
    //     \nSolid State Drive Capacity 8 TB
    //     \nConfigure To Order {Factory Upgraded from Base Spec}
    //     $$`,
    //     discount: 12,
    // },
    // {
    //   name: "Laptop Dell XPS 13 9340 ",
    //   brand: "Dell",
    //   price: 3149,
    //   type_id: 1,
    //   imageurl:
    //     "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2024/10/17/71034922-2.png",
    //   detail: `$$
    //     The Dell XPS 13 9340 71034922 is one of Dell's premium laptops, offering a seamless blend of elegant design, powerful performance, and outstanding portability. Equipped with a robust Intel Core Ultra 5 processor, generous 16GB RAM, and a 1TB storage drive, along with the sleek InfinityEdge display, high-grade aluminum body, and a lightweight frame of just 1.19kg, the Dell XPS 13 9340 71034922 is not just a work device but also a luxury tech icon.
    //     \nKey Features
    //     \nPowerful Performance: With the Intel Core Ultra 5 processor, featuring 14 cores and speeds up to 4.5GHz, the laptop handles multitasking and complex tasks smoothly.
    //     \nDisplay: 13.4-inch FHD+ (1920x1200) screen with a 120Hz refresh rate, anti-glare technology, and Eyesafe protection for eye comfort.
    //     \nSleek and Lightweight Design: Weighing only 1.19kg and measuring 295.3 x 199.1 x 15.3 mm, it’s highly portable and stylish.
    //     \nAmple Memory and Storage: With 16GB LPDDR5X RAM and 1TB M.2 PCIe NVMe SSD, it provides spacious storage and high processing speeds.
    //     \nAdvanced Connectivity: Equipped with Wi-Fi 7, Bluetooth 5.4, and two Thunderbolt 4 ports, ensuring fast data transfer and connectivity.
    //     $$`,
    //     discount: 0,
    // },
    // {
    //   name: "Laptop Dell XPS 13 Plus 9320-5CG56",
    //   brand: "Dell",
    //   price: 1149,
    //   type_id: 1,
    //   imageurl:
    //     "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2022/11/09/image-removebg-preview-58.png",
    //   detail: `$$
    //     The Dell XPS 13 Plus 9320-5CG56  is one of Dell's premium laptops, offering a seamless blend of elegant design, powerful performance, and outstanding portability. Equipped with a robust Intel Core Ultra 5 processor, generous 16GB RAM, and a 1TB storage drive, along with the sleek InfinityEdge display, high-grade aluminum body, and a lightweight frame of just 1.19kg, the Dell XPS 13 9340 71034922 is not just a work device but also a luxury tech icon.
    //     \nKey Features
    //     \nPowerful Performance: With the Intel Core Ultra 5 processor, featuring 14 cores and speeds up to 4.5GHz, the laptop handles multitasking and complex tasks smoothly.
    //     \nDisplay: 13.4-inch FHD+ (1920x1200) screen with a 120Hz refresh rate, anti-glare technology, and Eyesafe protection for eye comfort.
    //     \nSleek and Lightweight Design: Weighing only 1.19kg and measuring 295.3 x 199.1 x 15.3 mm, it’s highly portable and stylish.
    //     \nAmple Memory and Storage: With 16GB LPDDR5X RAM and 1TB M.2 PCIe NVMe SSD, it provides spacious storage and high processing speeds.
    //     \nAdvanced Connectivity: Equipped with Wi-Fi 7, Bluetooth 5.4, and two Thunderbolt 4 ports, ensuring fast data transfer and connectivity.
    //     $$`,
    //     discount: 0,
    // },
    // {
    //   name: "Laptop Acer Nitro 5 Tiger",
    //   brand: "Acer",
    //   price: 1449,
    //   type_id: 1,
    //   imageurl:
    //     "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2022/09/16/image-removebg-preview-2022-09-16t145717-836.png",
    //   detail: `$$
    //     The Laptop Acer Nitro 5 Tiger is one of Dell's premium laptops, offering a seamless blend of elegant design, powerful performance, and outstanding portability. Equipped with a robust Intel Core Ultra 5 processor, generous 16GB RAM, and a 1TB storage drive, along with the sleek InfinityEdge display, high-grade aluminum body, and a lightweight frame of just 1.19kg, the Dell XPS 13 9340 71034922 is not just a work device but also a luxury tech icon.
    //     \nKey Features
    //     \nPowerful Performance: With the Intel Core Ultra 5 processor, featuring 14 cores and speeds up to 4.5GHz, the laptop handles multitasking and complex tasks smoothly.
    //     \nDisplay: 13.4-inch FHD+ (1920x1200) screen with a 120Hz refresh rate, anti-glare technology, and Eyesafe protection for eye comfort.
    //     \nSleek and Lightweight Design: Weighing only 1.19kg and measuring 295.3 x 199.1 x 15.3 mm, it’s highly portable and stylish.
    //     \nAmple Memory and Storage: With 16GB LPDDR5X RAM and 1TB M.2 PCIe NVMe SSD, it provides spacious storage and high processing speeds.
    //     \nAdvanced Connectivity: Equipped with Wi-Fi 7, Bluetooth 5.4, and two Thunderbolt 4 ports, ensuring fast data transfer and connectivity.
    //     $$`,
    //     discount: 0,
    // },
  ]);
};
