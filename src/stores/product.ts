import { defineStore } from 'pinia'
import type { Product } from './cart'
import prod_1 from '@/images/wwcb.jpg'
import prod_2 from '@/images/sapc.jpg'
import prod_3 from '@/images/tyc.webp'
import prod_4 from '@/images/dccb.webp'
import prod_5 from '@/images/bbcb.jpg'
import prod_6 from '@/images/ccb.webp'
import prod_7 from '@/images/ccpc.webp'
import prod_8 from '@/images/ccdcw.webp'
import prod_9 from '@/images/cccw.webp'
import prod_10 from '@/images/ccacw.webp'
import prod_11 from '@/images/cclp.webp'
import prod_12 from '@/images/dbrc.jpg'
import prod_13 from '@/images/dcrc.jpg'
import prod_14 from '@/images/pretz.jpg'
import prod_15 from '@/images/gfrc.jpg'
import prod_16 from '@/images/grams.jpg'
import prod_17 from '@/images/classic.jpg'
import prod_18 from '@/images/seasalt.jpg'
import prod_19 from '@/images/nut.jpg'
import prod_20 from '@/images/celeb.jpg'

export const useProductStore = defineStore('products', {
  state: () => ({
    // Mock product data
    products: [
      {
        id: 1,
        name: 'Whimsical Wildflower Cookie Box',
        price: 600,
        image: prod_1,
        description:
          'Embrace the enchanting beauty of Spring with the Whimsical Wildflower Cookie Box. Filled with an irresistible assortment of freshly baked cookies, this delightful box brings together nature’s charm and decadent flavors for a treat that’s as beautiful as it is delicious. Included inside are 18 bite-sized cookies, 12 brownie bites, and 2 frosted flower cookies. Whether gifting to a loved one or indulging yourself, it’s the perfect way to celebrate the season with a touch of whimsy.',
        category: 'cookies-and-brownies',
      },
      {
        id: 2,
        name: 'Sunshine and Petals Cookie Crate',
        price: 750,
        image: prod_2,
        description:
          'A perfect Spring day is best enjoyed under clear skies, surrounded by beautiful flowers, and complemented by the irresistible indulgence of our cookies. Inside this sunny crate are 9 original cookies, 12 brownie bites, and 2 frosted flower cookies.',
        category: 'cookies-and-brownies',
      },
      {
        id: 3,
        name: 'Thinking of You Cookie Crate',
        price: 575,
        image: prod_3,
        description:
          'Brighten someone’s day with our Thinking of You Cookie Crate – a delicious, thoughtful way to show how much you care! Each charming crate is filled with a delightful assortment of our handcrafted cookies, baked fresh and bursting with comforting flavors. Inside are 24 bite-sized cookies, 12 brownie bites, and 2 natural frosted cookies. ',
        category: 'cookies-and-brownies',
      },
      {
        id: 4,
        name: 'Daisy Chain Cookie and Brownie Box',
        price: 500,
        image: prod_4,
        description:
          'Keep it sweet and simple with this summery cookie box that includes 18 bite-sized cookies, 12 brownie bites, and 2 natural frosted cookies, finished with a hand-tied bow.',
        category: 'cookies-and-brownies',
      },
      {
        id: 5,
        name: 'Blossom Bites Cookie Basket',
        price: 1025,
        image: prod_5,
        description: 'Our Blossom Bites Cookie Basket is adorned with a floral-pattern fabric liner and is brimming with fresh-baked delights. Inside, you’ll find an array of sweet treats, including beautifully hand-frosted daisy cookies, crafted to capture the essence of Spring in every bite. Included inside this reusable basket are 9 original cookies, 24 bite-sized cookies, 12 brownie bites, 3 frosted cookies, and 4 oz. toffee nut popcorn.',
        category: 'cookies-and-brownies',
      },
      {
        id: 6,
        name: 'Blueberry Coffee Cake',
        price: 850,
        image: prod_6,
        description:
          'ndulge in the delightful taste of the New England Blueberry Coffee Cake, a moist and flavorful treat perfect for any occasion. This delectable cake features fresh New England blueberries nestled within and atop the batter, complemented by a hint of pure New England maple syrup for a truly authentic flavor. Crafted with premium ingredients, this cake delivers homemade goodness in every bite. ',
        category: 'coffee-cakes',
      },
      {
        id: 7,
        name: 'Pineapple Coconut Coffee Cake',
        price: 850,
        image: prod_7,
        description: 'Try something a little more exotic with our Pineapple Coconut Coffee Cake. The newest addition to our line-up of cakes combine beautiful flakes of pure coconut and perfectly ripe pineapple chunks. The result is a combination of outstanding flavor and luxurious taste. Baked with the freshest ingredients. ',
        category: 'coffee-cakes',
      },
      {
        id: 8,
        name: 'Double Chocolate Walnut Coffee Cake',
        price: 850,
        image: prod_8,
        description: 'Finally- a coffee cake for chocolate lovers! Our exclusive recipe calls for the best ingredients to create a smooth chocolate batter generously sprinkled with semi-sweet chocolate morsels and fresh walnuts.',
        category: 'coffee-cakes',
      },
      {
        id: 9,
        name: 'Cinnamon Walnut Coffee Cake',
        price: 850,
        image: prod_9,
        description: 'Crafted by hand with the finest ingredients including farm fresh eggs, pure bourbon vanilla and sour cream. This deliciously moist classic is adorned with Mariani walnuts and finished with a cinnamon streusel.',
        category: 'coffee-cakes',
      },
      {
        id: 10,
        name: 'Apple Cinnamon Walnut Coffee Cake',
        price: 850,
        image: prod_10,
        description: 'A scrumptious update to a coffee cake classic. Our recipe calls for a batter of cinnamon streusel and Mariani walnuts, layered with fresh Granny Smith apples and slow-baked to gently caramelize and sweeten the tart fruit slices.',
        category: 'coffee-cakes',
      },
      {
        id: 11,
        name: 'Lemon Poppyseed Coffee Cake',
        price: 850,
        image: prod_11,
        description: 'Bursting with fresh lemon flavor, this moist handcrafted cake features savory citrus accented with a pinch of cinnamon and a generous sprinkling of poppy seeds. Each cake is baked with the freshest ingredients.',
        category: 'coffee-cakes',
      },
      {
        id: 12,
        name: 'Birthday Party Deluxe Rice Krispie Treats Box',
        price: 250,
        image: prod_12,
        description: 'The Birthday Party Treats Box is like your very own party in a box! This Treat House gift contains jumbo decorated rice krispie treats that are pull-apart gooey goodness. This collection of treats arrive in a Treat House gift box with a gift ribbon. All rice krispie treats are hand-made and uniquely decorated just for you. ',
        category: 'sweet-treats',
      },
      {
        id: 13,
        name: 'Congratulations Deluxe Rice Krispie Gift Box',
        price: 250,
        image: prod_13,
        description: 'Celebrate a big day with our Congrats gift box of jumbo decorated rice krispie treats that are pull-apart gooey goodness. This collection of treats arrive in a Treat House gift box with a gift ribbon. All Rice Krispie treats are hand-made and uniquely decorated just for you.',
        category: 'sweet-treats',
      },
      {
        id: 14,
        name: 'Ultimate Belgian Chocolate-Covered Pretzels & Nibblers',
        price: 350,
        image: prod_14,
        description: 'Send the perfect celebration gift with this combo! Each treat is enrobed in Belgian chocolate and then hand-decorated with chocolate drizzle, colorful sprinkles and candy. Great gift for a birthday, thank you, thinking of you or any occasion. Crafted by artisans in a small batch kitchen, no two will looks exactly the same.',
        category: 'sweet-treats',
      },
      {
        id: 15,
        name: 'Gluten Free Mini Rice Krispie Treats',
        price: 250,
        image: prod_15,
        description: 'Indulge in the delightful flavors of Treat House’s Gluten-Free 12-Pack—a curated selection of gourmet crispy rice and marshmallow treats, all crafted without gluten. This assortment includes: a classic crispy rice infused with colorful candies, caramel sea salt, birthday cake, chocolate peanut butter, s’mores, and cotton candy​.',
        category: 'sweet-treats',
      },
      {
        id: 16,
        name: 'Birthday Belgian Chocolate Cookie Grams',
        price: 200,
        image: prod_16,
        description: 'It’s a Birthday celebration with our 14 Nibblers® bite-sized cookies, enrobed in rich Belgian dark & milk chocolate. Each Nibbler is then hand-decorated with sprinkles, candy and white chocolate "Birthday" message. Crafted by artisans in a small batch kitchen; no two will look exactly the same.',
        category: 'sweet-treats',
      },
      {
        id: 17,
        name: 'Dozen Classic Belgian Chocolate Strawberries',
        price: 800,
        image: prod_17,
        description: '12 large, luscious berries, dipped in three kinds of Belgian chocolate (dark, milk, and white) are exquisitely hand-drizzled in contrasting chocolate for your confectionery pleasure. Crafted by artisans in a small batch kitchen, no two will look exactly the same.',
        category: 'strawberries',
      },
      {
        id: 18,
        name: 'Dozen Sea Salt Belgian Chocolate Strawberries with Caramel',
        price: 850,
        image: prod_18,
        description: 'How to make the best even better...Take a dozen luscious strawberries, put a nugget of caramel inside each one, dip in Belgian chocolate and sprinkle with sea salt! Crafted by artisans in a small batch kitchen, no two will looks exactly the same.',
        category: 'strawberries',
      },
      {
        id: 19,
        name: 'Dozen Nut & Belgian Chocolate Strawberries',
        price: 850,
        image: prod_19,
        description: '12 large, sweet and crunchy berries, dipped in three kinds of Belgian chocolate (dark, milk, and white) and then dusted with just the right amount of almond nuts. Crafted by artisans in a small batch kitchen, no two will looks exactly the same.',
        category: 'strawberries',
      },
      {
        id: 20,
        name: 'Dozen Celebration Belgian Chocolate Strawberries',
        price: 800,
        image: prod_20,
        description: 'Add a splash of color to your next gift. Perfect for a Birthday, Thank You or any occasion. Includes 12 large, luscious berries, dipped in two kinds of Belgian chocolate (milk, and white) are exquisitely hand- decorated in colorful drizzle and sprinkle designs for your confectionery pleasure. Crafted by artisans in a small batch kitchen, no two will looks exactly the same.',
        category: 'strawberries',
      },
    ] as Product[],
  }),

  getters: {
    // Get all available categories
    categories(): string[] {
      const categorySet = new Set<string>()
      this.products.forEach((product) => categorySet.add(product.category))
      return Array.from(categorySet)
    },
  },

  actions: {
    // Filter products by category
    getProductsByCategory(category: string): Product[] {
      if (category === 'all') {
        return this.products
      }
      return this.products.filter((product) => product.category === category)
    },

    // Get a single product by ID
    getProductById(id: number): Product | undefined {
      return this.products.find((product) => product.id === id)
    },
  },
})
