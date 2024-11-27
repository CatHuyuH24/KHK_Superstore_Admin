/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("televisions").del();
  await knex("televisions").insert([
    {
      name: "Samsung QLED 8K",
      brand: "Samsung",
      price: 2999,
      imageurl:
        "https://images.samsung.com/is/image/samsung/p6pim/at/qe85qn900btxxn/gallery/at-qled-tv-qe85qn900btxxn-front-black-533043096?$650_519_PNG$",
      detail: `$$
              Samsung QLED 8K TV with stunning picture quality and immersive sound.
              \nKey Features:
              \n8K resolution for incredible detail
              \nQuantum HDR for enhanced contrast
              \nSmart TV features with voice control
      $$`,
      discount: 10,
    },
    // {
    //   name: "LG Electronics 22-inch",
    //   brand: "LG",
    //   price: 1439,
    //   type_id: 3,
    //   imageurl: "https://th.bing.com/th/id/R.b799af9bf65576d27b756ef1ae1b65a3?rik=AJYwhpghSXELcA&pid=ImgRaw&r=0",
    //   detail: `$$
    //           LG  Electronics TV with perfect blacks and stunning colors.
    //           \nKey Features:
    //           \n4K resolution with OLED technology
    //           \nDolby Vision and Dolby Atmos
    //           \nSmart TV with AI ThinQ
    //           \nFull HD IPS display
    //           \nTriple XD Enginge
    //           \nLED Backlighting
    //           $$`,
    //           discount: 0,
    // },
    // {
    //   name: "LG OLED 4K",
    //   brand: "LG",
    //   price: 1999,
    //   type_id: 3,
    //   imageurl: "https://i.ebayimg.com/images/g/xz4AAOSwr~ZmxX6e/s-l1600.webp",
    //   detail: `$$
    //           LG OLED 4K TV with perfect blacks and stunning colors.
    //           \nKey Features:
    //           \n4K resolution with OLED technology
    //           \nDolby Vision and Dolby Atmos
    //           \nSmart TV with AI ThinQ
    //           $$`,
    //           discount: 0,
    // },
    // {
    //   name: "Smart Tivi 32 inch Darling 32HD946T2",
    //   brand: "Darling",
    //   price: 229,
    //   type_id: 3,
    //   imageurl:
    //     "https://darlingvietnam.net/wp-content/uploads/smart-tivi-darling-32hd946t2.jpg",
    //   detail: `$$
    //     \n32-inch Smart TV Darling 32HD946T2 with Full HD Quality
    //     \nFeaturing a sleek and modern design with a 32-inch screen, the Darling 32HD946T2 Smart TV has ultra-thin bezels and a black color scheme that adds a sophisticated touch. It fits perfectly in various spaces within your home. Additionally, the TV stand is designed with an outward tilt on both sides, allowing the TV to stand stably on different flat surfaces.
    //     \nFULL HD RESOLUTION - Enjoy crisp and clear images with Full HD resolution, providing a more immersive viewing experience.
    //     \nSMART TV FEATURES - Access your favorite streaming services like Netflix, YouTube, and more directly from your TV with built-in Wi-Fi connectivity.
    //     \nMULTIPLE CONNECTIVITY OPTIONS - The TV comes with multiple ports including HDMI, USB, and VGA, allowing you to connect various devices such as gaming consoles, laptops, and external storage.
    //     \nENERGY EFFICIENT - Designed to be energy efficient, the Darling 32HD946T2 Smart TV consumes less power, helping you save on electricity bills.
    //     \nUSER-FRIENDLY INTERFACE - The intuitive and user-friendly interface makes it easy to navigate through different apps and settings.
    //     \nBUILT-IN SPEAKERS - Equipped with high-quality built-in speakers that deliver clear and powerful sound, enhancing your overall viewing experience.
    //     \nWALL MOUNTABLE - The TV is wall mountable, giving you the flexibility to place it wherever you prefer, whether on a stand or mounted on the wall.
    //     \nREMOTE CONTROL - Comes with a remote control that provides easy access to all the features and functions of the TV.
    //     \nWARRANTY - Includes a one-year warranty for peace of mind and reliable customer support.
    //     $$`,
    //       discount: 0,
    // },
    // {
    //   name: "Smart Tivi Darling 43 Inch 43FH960S",
    //   brand: "Darling",
    //   price: 289,
    //   type_id: 3,
    //   imageurl:
    //     "https://darlingvietnam.net/wp-content/uploads/a1-3027-e1578627782300.jpg",
    //   detail: `$$
    //       32-inch Smart TV Darling 32HD946T2 with Full HD Quality
    //       \nFeaturing a sleek and modern design with a 32-inch screen, the Darling 32HD946T2 Smart TV has ultra-thin bezels and a black color scheme that adds a sophisticated touch. It fits perfectly in various spaces within your home. Additionally, the TV stand is designed with an outward tilt on both sides, allowing the TV to stand stably on different flat surfaces.
    //       \nVGA Port: Allows the transfer of images and audio from a laptop to the TV to display content.
    //       \nUSB Port: Enables the TV to directly play images and videos from external storage via the TV's USB connection.
    //       \nHDMI Port: Quickly connects images and audio between the TV and devices like laptops or DVD players.
    //       $$`,
    //       discount: 0,
    // },
    // {
    //   name: "Tivi Led 40 inch Darling 40HD957T2",
    //   brand: "Darling",
    //   price: 259,
    //   type_id: 3,
    //   imageurl:
    //     "https://darlingvietnam.net/wp-content/uploads/tivi-led-darling-40hd957t2.jpg",
    //   detail: `$$
    //       32-inch Smart TV Darling 32HD946T2 with Full HD Quality
    //       \nFeaturing a sleek and modern design with a 32-inch screen, the Darling 32HD946T2 Smart TV has ultra-thin bezels and a black color scheme that adds a sophisticated touch. It fits perfectly in various spaces within your home. Additionally, the TV stand is designed with an outward tilt on both sides, allowing the TV to stand stably on different flat surfaces.
    //       \nVGA Port: Allows the transfer of images and audio from a laptop to the TV to display content.
    //       \nUSB Port: Enables the TV to directly play images and videos from external storage via the TV's USB connection.
    //       \nHDMI Port: Quickly connects images and audio between the TV and devices like laptops or DVD players.
    //       $$`,
    //       discount: 28,
    // },
    // {
    //   name: "Tivi Led 32 inch Darling 32HD955T2",
    //   brand: "Darling",
    //   price: 159,
    //   type_id: 3,
    //   imageurl:
    //     "https://darlingvietnam.net/wp-content/uploads/smart-tivi-32-inch-darling-32hd955t2-1.jpg",
    //   detail: `$$
    //       32-inch Smart TV Darling 32HD946T2 with Full HD Quality
    //       \nFeaturing a sleek and modern design with a 32-inch screen, the Darling 32HD946T2 Smart TV has ultra-thin bezels and a black color scheme that adds a sophisticated touch. It fits perfectly in various spaces within your home. Additionally, the TV stand is designed with an outward tilt on both sides, allowing the TV to stand stably on different flat surfaces.
    //       \nVGA Port: Allows the transfer of images and audio from a laptop to the TV to display content.
    //       \nUSB Port: Enables the TV to directly play images and videos from external storage via the TV's USB connection.
    //       \nHDMI Port: Quickly connects images and audio between the TV and devices like laptops or DVD players.
    //       $$`,
    //       discount: 10,
    // },
    // {
    //   name: "Tivi Led Darling 32HD957T2 32 inch",
    //   brand: "Darling",
    //   price: 159,
    //   type_id: 3,
    //   imageurl:
    //     "https://darlingvietnam.net/wp-content/uploads/tivi-led-darling-32-inch-32hd957t2.jpg",
    //   detail: `$$
    //         32-inch Smart TV Darling 32HD946T2 with Full HD Quality
    //         \nFeaturing a sleek and modern design with a 32-inch screen, the Darling 32HD946T2 Smart TV has ultra-thin bezels and a black color scheme that adds a sophisticated touch. It fits perfectly in various spaces within your home. Additionally, the TV stand is designed with an outward tilt on both sides, allowing the TV to stand stably on different flat surfaces.
    //         \nVGA Port: Allows the transfer of images and audio from a laptop to the TV to display content.
    //         \nUSB Port: Enables the TV to directly play images and videos from external storage via the TV's USB connection.
    //         \nHDMI Port: Quickly connects images and audio between the TV and devices like laptops or DVD players.
    //         $$`,
    //         discount: 35,
    // },
  ]);
};
