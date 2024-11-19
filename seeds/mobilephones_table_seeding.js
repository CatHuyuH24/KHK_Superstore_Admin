/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("mobilephones").del();
  await knex("mobilephones").insert([
    {
      name: "iPhone 14 Pro Max",
      brand: "Apple",
      price: 999,
      imageurl:
        "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2023/06/05/my-project.png",
      detail: `$$
        iPhone 14 Pro Max. Capture incredible detail with a 48MP Main camera. Experience iPhone in a whole new way with Dynamic Island and Always-On display. And get peace of mind with groundbreaking safety features.
        Key Features
        6.7-inch Super Retina XDR display1 featuring Always-On and ProMotion
        Dynamic Island, a magical new way to interact with iPhone
        48MP Main camera for up to 4x greater resolution
        Cinematic mode now in 4K Dolby Vision up to 30 fps
        Vital safety features—Emergency SOS via satellite2 and Crash Detection
        Action mode for smooth, steady, handheld videos
        All-day battery life and up to 29 hours of video playback3
        A16 Bionic, the ultimate smartphone chip. Superfast 5G cellular4
        Industry-leading durability features with Ceramic Shield and water resistance5
        iOS 16 offers even more ways to personalize, communicate, and share6
        Legal
        The display has rounded corners. When measured as a rectangle, the screen is 6.69 inches diagonally. Actual viewable area is less.
        Emergency SOS via satellite is available in November 2022. Service is included for free for two years with the activation of any iPhone 14 model. Connection and response times vary based on location, site conditions, and other factors. See apple.com/iphone-14 or apple.com/iphone-14-pro for more information.
        Data plan required. 5G is available in select markets and through select carriers. Speeds vary based on site conditions and carrier. For details on 5G support, contact your carrier and see apple.com/iphone/cellular.
        iPhone 14 Pro Max is splash, water, and dust resistant and was tested under controlled laboratory conditions with a rating of IP68 under IEC standard 60529 (maximum depth of 6 meters up to 30 minutes). Splash, water, and dust resistance are not permanent conditions. Resistance might decrease as a result of normal wear. Do not attempt to charge a wet iPhone; refer to the user guide for cleaning and drying instructions. Liquid damage not covered under warranty.
        Some features may not be available for all countries or all areas.
        $$`,
    },
    {
      name: "iPhone 16",
      brand: "Apple",
      price: 799,
      imageurl:
        "https://cdn.hoanghamobile.com/i/content/Uploads/2024/09/10/iphone-16-white-pdp-image-position-1a-white-color-vn-vi.jpg",
      detail: `$$
        iPhone 16. Capture incredible detail with a 48MP Main camera. Experience iPhone in a whole new way with Dynamic Island and Always-On display. And get peace of mind with groundbreaking safety features.
        Key Features
        6.7-inch Super Retina XDR display1 featuring Always-On and ProMotion
        Dynamic Island, a magical new way to interact with iPhone
        48MP Main camera for up to 4x greater resolution
        Cinematic mode now in 4K Dolby Vision up to 30 fps
        Vital safety features—Emergency SOS via satellite2 and Crash Detection
        Action mode for smooth, steady, handheld videos
        All-day battery life and up to 29 hours of video playback3
        A16 Bionic, the ultimate smartphone chip. Superfast 5G cellular4
        Industry-leading durability features with Ceramic Shield and water resistance5
        iOS 16 offers even more ways to personalize, communicate, and share6
        Legal
        The display has rounded corners. When measured as a rectangle, the screen is 6.69 inches diagonally. Actual viewable area is less.
        Emergency SOS via satellite is available in November 2022. Service is included for free for two years with the activation of any iPhone 14 model. Connection and response times vary based on location, site conditions, and other factors. See apple.com/iphone-14 or apple.com/iphone-14-pro for more information.
        Data plan required. 5G is available in select markets and through select carriers. Speeds vary based on site conditions and carrier. For details on 5G support, contact your carrier and see apple.com/iphone/cellular.
        iPhone 14 Pro Max is splash, water, and dust resistant and was tested under controlled laboratory conditions with a rating of IP68 under IEC standard 60529 (maximum depth of 6 meters up to 30 minutes). Splash, water, and dust resistance are not permanent conditions. Resistance might decrease as a result of normal wear. Do not attempt to charge a wet iPhone; refer to the user guide for cleaning and drying instructions. Liquid damage not covered under warranty.
        Some features may not be available for all countries or all areas.
        $$`,
    },
    {
      name: "iPhone 16 Plus",
      brand: "Apple",
      price: 899,
      imageurl:
        "https://cdn.hoanghamobile.com/i/content/Uploads/2024/09/10/iphone-16-black-pdp-image-position-1a-black-color-vn-vi.jpg",
      detail: `$$
        iPhone 16 Plus. Capture incredible detail with a 48MP Main camera. Experience iPhone in a whole new way with Dynamic Island and Always-On display. And get peace of mind with groundbreaking safety features.
        Key Features
        6.7-inch Super Retina XDR display1 featuring Always-On and ProMotion
        Dynamic Island, a magical new way to interact with iPhone
        48MP Main camera for up to 4x greater resolution
        Cinematic mode now in 4K Dolby Vision up to 30 fps
        Vital safety features—Emergency SOS via satellite2 and Crash Detection
        Action mode for smooth, steady, handheld videos
        All-day battery life and up to 29 hours of video playback3
        A16 Bionic, the ultimate smartphone chip. Superfast 5G cellular4
        Industry-leading durability features with Ceramic Shield and water resistance5
        iOS 16 offers even more ways to personalize, communicate, and share6
        Legal
        The display has rounded corners. When measured as a rectangle, the screen is 6.69 inches diagonally. Actual viewable area is less.
        Emergency SOS via satellite is available in November 2022. Service is included for free for two years with the activation of any iPhone 14 model. Connection and response times vary based on location, site conditions, and other factors. See apple.com/iphone-14 or apple.com/iphone-14-pro for more information.
        Data plan required. 5G is available in select markets and through select carriers. Speeds vary based on site conditions and carrier. For details on 5G support, contact your carrier and see apple.com/iphone/cellular.
        iPhone 14 Pro Max is splash, water, and dust resistant and was tested under controlled laboratory conditions with a rating of IP68 under IEC standard 60529 (maximum depth of 6 meters up to 30 minutes). Splash, water, and dust resistance are not permanent conditions. Resistance might decrease as a result of normal wear. Do not attempt to charge a wet iPhone; refer to the user guide for cleaning and drying instructions. Liquid damage not covered under warranty.
        Some features may not be available for all countries or all areas.
        $$`,
    },
    {
      name: "iPhone 16 Pro",
      brand: "Apple",
      price: 999,
      imageurl:
        "https://cdn.hoanghamobile.com/i/content/Uploads/2024/09/11/iphone-16-pro-white-titanium-pdp-image-position-1b-white-titanium-color-vn-vi.jpg",
      detail: `$$
        A Pro studio in your pocket. Get the first iPhone built for Apple Intelligence1 with the iPhone 16 Pro from Straight Talk.
        With a supersmart A18 chip, jump two generations ahead of the A16 Bionic chip in iPhone 15 to enable Apple Intelligence, powering advanced photo and video features, and supportive console-level gaming, with exceptional power efficiency. 
        Apple Intelligence helps you write, express yourself, and get things done effortlessly, and groundbreaking privacy protection gives you peace of mind that no one else can access your data.
        Take your videos to a whole new level with 4K 120 fps Dolby Vision, enabled by the 48MP Fusion camera. Capture stunning high-resolution images, with 2x optical-quality Telephoto and an improved 12MP Ultra Wide camera, featuring autofocus.
        iPhone 16 Pro works together with the A18 chip to deliver a big boost in battery life with up to 27 hours video playback.2 Charge via USB-C or snap on a MagSafe charger for faster wireless charging.3
        All this, with stunning titanium design. iPhone 16 Pro has a strong and light titanium design with a larger 6.3-inch Super Retina XDR display.4 It's remarkably durable with the latest-generation Ceramic Shield material that's 2x tougher than any smartphone glass.
        Pair the iPhone 16 Pro with a Straight Talk no-contract plan featuring unlimited talk & text, plus 10GB of high-speed data starting at only $35/month for a single line, all on America's most reliable 5G network. 
        To activate this device, a Straight Talk Wireless plan is required. Shop for the iPhone 16 Pro online or at your local Walmart.
        $$`,
    },
    {
      name: "iPhone 16 Pro Max",
      brand: "Apple",
      price: 1099,
      imageurl:
        "https://cdn.hoanghamobile.com/i/content/Uploads/2024/09/11/iphone-16-pro-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
      detail: `$$
        A Pro studio in your pocket. Get the first iPhone built for Apple Intelligence1 with the iPhone 16 Pro Max from Straight Talk.
        With a supersmart A18 chip, jump two generations ahead of the A16 Bionic chip in iPhone 15 to enable Apple Intelligence, powering advanced photo and video features, and supportive console-level gaming, with exceptional power efficiency.
        Apple Intelligence helps you write, express yourself, and get things done effortlessly, and groundbreaking privacy protection gives you peace of mind that no one else can access your data.
        Take your videos to a whole new level with 4K 120 fps Dolby Vision, enabled by the 48MP Fusion camera. Capture stunning high-resolution images, with 2x optical-quality Telephoto and an improved 12MP Ultra Wide camera, featuring autofocus.
        iPhone 16 Pro Max works together with the A18 chip to deliver a big boost in battery life with up to 33 hours video playback.2 Charge via USB-C or snap on a MagSafe charger for faster wireless charging.3
        All this, with stunning titanium design. iPhone 16 Pro Max has a strong and light titanium design with a larger 6.9-inch Super Retina XDR display.4 It's remarkably durable with the latest-generation Ceramic Shield material that's 2x tougher than any smartphone glass.
        Pair the iPhone 16 Pro Max with a Straight Talk no-contract plan featuring unlimited talk & text, plus 10GB of high-speed data starting at only $35/month for a single line, all on America's most reliable 5G network.
        To activate this device, a Straight Talk Wireless plan is required. Shop for the iPhone 16 Pro Max online or at your local Walmart.
        $$`,
    },
    {
      name: "iPhone 15",
      brand: "Apple",
      price: 729,
      imageurl:
        "https://admin.hoanghamobile.com/Uploads/2023/09/14/vn-iphone-15-pink-pdp-image-position-1a-pink-color.jpg",
      detail: `$$
        The iPhone you want for a price you'll love. The iPhone 15 in Blue from Straight Talk brings you Dynamic Island, 128GB of internal storage, a 48MP Main camera, and USB-C4—all in a durable color-infused glass and aluminum design. It's splash, water and dust resistant2 with a ceramic shield front that's tougher than any smartphone glass. And is made from more recycled materials to reduce environmental impact. Plus, capture next generation portraits in stunning detail and color and enjoy peace of mind with innovative safety features including Crash Detection, to call for help even if you can't.
        With Straight Talk's coverage on the network America relies on and no-contract Unlimited Plans you can always keep up with those who matter the most. Shop for the iPhone 15 and available Straight Talk plans online or at your local Walmart.
        6.1‑inch (diagonal) all‑screen OLED display1
        Rear camera: Advanced dual-camera system. 48MP Main / 12MP Ultra Wide
        Front camera: 12MP camera. Autofocus with Focus Pixels
        128GB Storage
        Built-in rechargeable lithium-ion battery3
        Splash, Water, and Dust Resistant2
        Enabled by TrueDepth camera for facial recognition
        USB-C Charge Cable capable4
        Compatible with no-contract Unlimited Plans from Straight Talk Wireless
        Pair this phone with a best-selling no-contract Straight Talk plan
        Learn more about Straight Talk by visiting our Brand Page
        †5G access requires a 5G-capable device in a 5G coverage area.
        The display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.12 inches diagonally. Actual viewable area is less
        iPhone 15 is splash, water, and dust resistant and were tested under controlled laboratory conditions with a rating of IP68 under IEC standard 60529 (maximum depth of 6 meters up to 30 minutes). Splash, water, and dust resistance are not permanent conditions. Resistance might decrease as a result of normal wear. Do not attempt to charge a wet iPhone; refer to the user guide for cleaning and drying instructions. Liquid damage not covered under warranty.
        All battery claims depend on network configuration and many other factors; actual results will vary. Battery has limited recharge cycles and may eventually need to be replaced. Battery life and charge cycles vary by use and settings. See apple.com/batteries and apple.com/iphone/battery.html for more information.
        The included USB‑C Charge Cable is compatible with AirPods Pro (2nd generation) with MagSafe Charging Case (USB‑C).
        $$`,
    },
    {
      name: "iPhone 15 Plus",
      brand: "Apple",
      price: 829,
      imageurl:
        "https://cdn.hoanghamobile.com/i/preview-h-V2/Uploads/2024/09/09/iphone-15-plus-vang-1.jpg",
      detail: `$$
        The iPhone you want for a price you'll love. iPhone 15 Plus in Pink from Straight Talk brings you Dynamic Island, 128GB of internal storage, a 48MP Main camera and USB-C—all in a durable color-infused glass and aluminum design. It's splash, water and dust resistant2 with a ceramic shield front that's tougher than any smartphone glass. Enjoy all-day battery life, with up to 26 hours of video playback for all the things you want to keep doing. And is made from more recycled materials to reduce environmental impact. Plus, capture next generation portraits in stunning detail and color and enjoy peace of mind with innovative safety features including Crash Detection, to call for help even if you can't.
        With Straight Talk's coverage on the network America relies on and no-contract Unlimited Plans you can always keep up with those who matter the most. Shop for the iPhone 15 Plus and available Straight Talk plans online or at your local Walmart.
        6.7‑inch (diagonal) all‑screen OLED display1
        Rear camera: Advanced dual-camera system. 48MP Main / 12MP Ultra Wide
        Front camera: 12MP camera. Autofocus with Focus Pixels
        128GB Storage
        Splash, Water, and Dust Resistant2
        Built-in rechargeable lithium-ion battery3
        Enabled by TrueDepth camera for facial recognition
        USB-C Charge Cable capable4
        Compatible with no-contract Unlimited Plans from Straight Talk Wireless
        Pair this phone with a best-selling no-contract Straight Talk plan
        Learn more about Straight Talk by visiting our Brand Page
        †5G access requires a 5G-capable device in a 5G coverage area.
        The display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.69 inches diagonally. Actual viewable area is less
        iPhone 15 is splash, water, and dust resistant and were tested under controlled laboratory conditions with a rating of IP68 under IEC standard 60529 (maximum depth of 6 meters up to 30 minutes). Splash, water, and dust resistance are not permanent conditions. Resistance might decrease as a result of normal wear. Do not attempt to charge a wet iPhone; refer to the user guide for cleaning and drying instructions. Liquid damage not covered under warranty.
        All battery claims depend on network configuration and many other factors; actual results will vary. Battery has limited recharge cycles and may eventually need to be replaced. Battery life and charge cycles vary by use and settings. See apple.com/batteries and apple.com/iphone/battery.html for more information.
        $$`,
    },
    {
      name: "iPhone 15 Pro",
      brand: "Apple",
      price: 929,
      imageurl:
        "https://cdn.hoanghamobile.com/i/preview-h-V2/Uploads/2024/09/09/iphone-15-pro-tu-nhien-1.jpg",
      detail: `$$
        iPhone 15 Pro. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.
        FORGED IN TITANIUM - iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back. It also features a Ceramic Shield front that's tougher than any smartphone glass. And it's splash, water, and dust resistant.
        ADVANCED DISPLAY - The 6.7" Super Retina XDR display with ProMotion ramps up refresh rates to 120Hz when you need exceptional graphics performance. Dynamic Island bubbles up alerts and Live Activities. Plus, with Always-On display, your Lock Screen stays glanceable, so you don't have to tap it to stay in the know.
        GAME-CHANGING A17 PRO CHIP - A Pro-class GPU makes mobile games feel so immersive, with rich environments and realistic characters. A17 Pro is also incredibly efficient and helps to deliver amazing all-day battery life.
        POWERFUL PRO CAMERA SYSTEM - Get incredible framing flexibility with 7 pro lenses. Capture super high-resolution photos with more color and detail using the 48MP Main camera. And take sharper close-ups from farther away with the 5x Telephoto camera on iPhone 15 Pro Max.
        CUSTOMIZABLE ACTION BUTTON - Action button is a fast track to your favorite feature. Just set the one you want, like Silent mode, Camera, Voice Memo, Shortcut, and more. Then press and hold to launch the action.
        PRO CONNECTIVITY - The new USB-C connector lets you charge your Mac or iPad with the same cable you use to charge iPhone 15 Pro Max. With USB 3, you get a huge leap in data transfer speeds. And you can download files up to 2x faster using Wi-Fi 6E.
        VITAL SAFETY FEATURES - If your car breaks down when you're off the grid, you can get help with Roadside Assistance via satellite. And if you need emergency services and you don't have cell service or Wi-Fi, you can use Emergency SOS via satellite. With Crash Detection, iPhone can detect a severe car crash and call for help if you can't.
        DESIGNED TO MAKE A DIFFERENCE - iPhone comes with privacy protections that help keep you in control of your data. It's made from more recycled materials to minimize environmental impact. And it has built-in features that make iPhone more accessible to all.
        COMES WITH APPLECARE WARRANTY - Every iPhone comes with a one-year limited warranty and up to 90 days of complimentary technical support. Get AppleCare+ or AppleCare+ with Theft and Loss to extend your coverage.
        Legal
        iPhone 15, iPhone 15 Plus, iPhone 15 Pro, and iPhone 15 Pro Max are splash, water, and dust resistant and were tested under controlled laboratory conditions with a rating of IP68 under IEC standard 60529 (maximum depth of 6 meters up to 30 minutes). Splash, water, and dust resistance are not permanent conditions. Resistance might decrease as a result of normal wear. Do not attempt to charge a wet iPhone; refer to the user guide for cleaning and drying instructions. Liquid damage not covered under warranty.
        The display has rounded corners. When measured as a standard rectangle, the screen is 6.12 inches (iPhone 15 Pro, iPhone 15) or 6.69 inches (iPhone 15 Pro Max, iPhone 15 Plus) diagonally. Actual viewable area is less.
        Battery life varies by use and configuration.
        USB 3 cable with 10Gb/s speed required for up to 20x faster transfers on iPhone 15 Pro models.
        Wi-Fi 6E available in countries and regions where supported.
        Service is included for free for two years with the activation of any iPhone 15 model. Connection and response times vary based on location, site conditions, and other factors.
        iPhone 15 and iPhone 15 Pro can detect a severe car crash and call for help. Requires a cellular connection or Wi-Fi Calling.
        Height: 6.29 inches (159.9mm)
        Width: 3.02 inches (76.7mm)
        Depth: 0.32 inch (8.25mm)
        Weight: 7.81 ounces (221 grams)
        $$`,
    },
    {
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 1029,
      imageurl:
        "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2024/06/24/15-pro-max-trang-2.png",
      detail: `$$
        iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.
        FORGED IN TITANIUM - iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back. It also features a Ceramic Shield front that's tougher than any smartphone glass. And it's splash, water, and dust resistant.
        ADVANCED DISPLAY - The 6.7" Super Retina XDR display with ProMotion ramps up refresh rates to 120Hz when you need exceptional graphics performance. Dynamic Island bubbles up alerts and Live Activities. Plus, with Always-On display, your Lock Screen stays glanceable, so you don't have to tap it to stay in the know.
        GAME-CHANGING A17 PRO CHIP - A Pro-class GPU makes mobile games feel so immersive, with rich environments and realistic characters. A17 Pro is also incredibly efficient and helps to deliver amazing all-day battery life.
        POWERFUL PRO CAMERA SYSTEM - Get incredible framing flexibility with 7 pro lenses. Capture super high-resolution photos with more color and detail using the 48MP Main camera. And take sharper close-ups from farther away with the 5x Telephoto camera on iPhone 15 Pro Max.
        CUSTOMIZABLE ACTION BUTTON - Action button is a fast track to your favorite feature. Just set the one you want, like Silent mode, Camera, Voice Memo, Shortcut, and more. Then press and hold to launch the action.
        PRO CONNECTIVITY - The new USB-C connector lets you charge your Mac or iPad with the same cable you use to charge iPhone 15 Pro Max. With USB 3, you get a huge leap in data transfer speeds. And you can download files up to 2x faster using Wi-Fi 6E.
        VITAL SAFETY FEATURES - If your car breaks down when you're off the grid, you can get help with Roadside Assistance via satellite. And if you need emergency services and you don't have cell service or Wi-Fi, you can use Emergency SOS via satellite. With Crash Detection, iPhone can detect a severe car crash and call for help if you can't.
        DESIGNED TO MAKE A DIFFERENCE - iPhone comes with privacy protections that help keep you in control of your data. It's made from more recycled materials to minimize environmental impact. And it has built-in features that make iPhone more accessible to all.
        COMES WITH APPLECARE WARRANTY - Every iPhone comes with a one-year limited warranty and up to 90 days of complimentary technical support. Get AppleCare+ or AppleCare+ with Theft and Loss to extend your coverage.
        Legal
        iPhone 15, iPhone 15 Plus, iPhone 15 Pro, and iPhone 15 Pro Max are splash, water, and dust resistant and were tested under controlled laboratory conditions with a rating of IP68 under IEC standard 60529 (maximum depth of 6 meters up to 30 minutes). Splash, water, and dust resistance are not permanent conditions. Resistance might decrease as a result of normal wear. Do not attempt to charge a wet iPhone; refer to the user guide for cleaning and drying instructions. Liquid damage not covered under warranty.
        The display has rounded corners. When measured as a standard rectangle, the screen is 6.12 inches (iPhone 15 Pro, iPhone 15) or 6.69 inches (iPhone 15 Pro Max, iPhone 15 Plus) diagonally. Actual viewable area is less.
        Battery life varies by use and configuration.
        USB 3 cable with 10Gb/s speed required for up to 20x faster transfers on iPhone 15 Pro models.
        Wi-Fi 6E available in countries and regions where supported.
        Service is included for free for two years with the activation of any iPhone 15 model. Connection and response times vary based on location, site conditions, and other factors.
        iPhone 15 and iPhone 15 Pro can detect a severe car crash and call for help. Requires a cellular connection or Wi-Fi Calling.
        Height: 6.29 inches (159.9mm)
        Width: 3.02 inches (76.7mm)
        Depth: 0.32 inch (8.25mm)
        Weight: 7.81 ounces (221 grams)
        $$`,
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      price: 1399,
      imageurl:
        "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2024/01/16/s24-xam-den.png",
      detail: `$$ 
        Samsung Galaxy S24 Ultra. The ultimate smartphone with advanced camera technology, exceptional performance, and cutting-edge design.
        DESIGN AND DISPLAY - The S24 Ultra features a stunning 6.8" Dynamic AMOLED display with a 120Hz refresh rate, offering vibrant colors and smooth performance. The design is sleek, with premium materials and a durable frame.
        CAMERA SYSTEM - Equipped with a 200MP main camera and advanced zoom capabilities, the Galaxy S24 Ultra can capture breathtaking photos and videos in any condition. It includes a 12MP ultra-wide camera and two telephoto lenses for detailed shots at various distances.
        PERFORMANCE - Powered by the Exynos 2400 chip (or Snapdragon 8 Gen 3 depending on region), the S24 Ultra offers exceptional performance for gaming, multitasking, and productivity. Coupled with up to 12GB of RAM, you get a fast and responsive experience.
        BATTERY AND CHARGING - With a large 5000mAh battery, the S24 Ultra ensures all-day usage. It also supports fast charging, allowing you to quickly power up your phone when you need it the most.
        SOFTWARE EXPERIENCE - Running the latest version of One UI, Samsung’s custom skin, the Galaxy S24 Ultra offers a user-friendly interface, along with useful features like DeX for desktop-like functionality, split-screen multitasking, and more.
        CONNECTIVITY - The S24 Ultra supports 5G connectivity for lightning-fast internet speeds, as well as Wi-Fi 6E, Bluetooth 5.3, and ultra-wideband (UWB) for advanced features.
        SECURITY - Samsung's Knox security platform offers robust protection for your personal data, while features like an under-display fingerprint sensor and facial recognition provide secure unlocking options.
        WATER-RESISTANT - The Galaxy S24 Ultra is IP68 rated, meaning it is resistant to water and dust, making it durable and perfect for everyday use in various environments.
        INCLUDES SAMSUNG CARE - Every purchase of the Galaxy S24 Ultra comes with a limited warranty and customer support services. You can also opt for Samsung Care+ for added protection.
        Legal
        The Samsung Galaxy S24 Ultra has been tested under controlled laboratory conditions and is certified with an IP68 rating for water and dust resistance. Actual performance may vary based on usage and conditions.
        Battery life may vary depending on usage patterns and software settings. For optimum battery health, follow the manufacturer's charging guidelines.
      $$`,
    },
    {
      name: "Samsung Galaxy S24",
      brand: "Samsung",
      price: 999,
      imageurl:
        "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2024/01/30/samsung-galaxy-s24-1.png",
      detail: `$$ 
        Samsung Galaxy S24. A sleek, powerful, and versatile smartphone designed for a premium experience with cutting-edge technology and a stunning display.
        DISPLAY AND DESIGN - The Samsung Galaxy S24 boasts a 6.1" Dynamic AMOLED 2X display with 120Hz refresh rate, providing smooth and vibrant visuals. Its compact design fits comfortably in your hand while delivering an immersive viewing experience.
        CAMERA SYSTEM - The S24 is equipped with a triple camera setup, including a 50MP primary camera, a 12MP ultra-wide lens, and a 10MP telephoto lens with 3x optical zoom. Capture stunning photos with enhanced clarity and detail in all lighting conditions.
        PERFORMANCE - Powered by the latest Snapdragon 8 Gen 3 processor (or Exynos 2400, depending on the region), the Galaxy S24 provides blazing-fast performance for multitasking, gaming, and productivity. It comes with up to 12GB of RAM and multiple storage options.
        BATTERY AND CHARGING - With a 3900mAh battery, the Galaxy S24 ensures you can use your phone throughout the day. It also supports 25W fast charging and wireless charging, so you can quickly recharge your device.
        SOFTWARE EXPERIENCE - Running Samsung's One UI, the Galaxy S24 offers an intuitive and customizable interface with a variety of features like DeX mode, split-screen multitasking, and more.
        CONNECTIVITY - The phone supports 5G connectivity for ultra-fast internet speeds, Wi-Fi 6E, Bluetooth 5.3, and NFC for a smooth and connected experience.
        SECURITY - Samsung Knox security provides multi-layered protection for your personal data. Features like an in-display fingerprint sensor and facial recognition ensure secure access to your device.
        WATER-RESISTANT - The Galaxy S24 comes with an IP68 rating, making it water and dust resistant, perfect for all-day use in various environments.
        INCLUDED WITH SAMSUNG CARE - Enjoy peace of mind with Samsung's warranty and customer support services. You can also choose Samsung Care+ for extended protection options.
        Legal
        The Samsung Galaxy S24 is IP68 rated for water and dust resistance and has been tested under controlled conditions. Actual performance may vary based on usage and environmental conditions.
        Battery life is subject to change based on usage patterns, apps, and settings. Refer to the manufacturer's guide for optimal charging and battery care.
        $$`,
    },
  ]);
};
