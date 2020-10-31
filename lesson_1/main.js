Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true 
		}
	},
	template: `
		<div class="product">
            <div class="product-image">
                <a :href="myLink" :target="myLinkTarget">
                    <img :src="image" :alt="altText" />
                </a>
            </div>

            <div class="product-info">
                <h1>{{title}}</h1>
                <span v-if="onSale">On Sale!</span>
                <p v-if="inventory > 10">In stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p v-else :class="{outoff: !onSale}">Out of stock</p>
                <p v-show="delivery">Can be dilever</p>
				<p>Shipping: {{shipping}}</p>

                <ul>
                    <li v-for="detail in details">{{detail}}</li>
                </ul>

                <div v-for="(variant, index) in variants" :key="variant.variantId"
					class="color-box"
					:style="{backgroundColor: variant.variantColor}"
					@mouseover="updateProduct(index)">
                </div>

                <ul>
                    <li v-for="size in sizes">{{size}}</li>
                </ul>
                <hr>
                <button 
					:class="{disabledButton: !inStock}" 
					v-on:click="addToCart"
					:disabled="!inStock"
				>Add to cart</button>
				<button v-on:click="removeFromCart">Remove from cart</button>
            </div>
        </div>
	`,
	data() {
		return {
			product: 'Socks',
			brand: 'Vue Mastery',
			selectedVariant: 0,
			altText: 'Best socks',
			myLink: 'https://www.google.com',
			myLinkTarget: '__blank',
			inventory: 0,
			delivery: true,
			details: ["80% cotton", "20% poleester", "gender-neutral"],
			variants: [
			{
			  variantId: 2234,
			  variantColor: "green",
			  varianImage: '001-green.jpg',
			  variantQuantity: 10
			},
			{
			  variantId: 2235,
			  variantColor: "blue",
			  varianImage: '001-blue.jpg',
			  variantQuantity: 0
			}
			],
			sizes: ["20", "30", "40", "50"],		
		}
      
    },
    methods: {
      addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
      },
	  updateProduct(index) {
		this.selectedVariant = index
		console.log(index);
	  },
	  removeFromCart() {
		  if (this.cart > 0) {
			  this.cart -= 1
		  }
	  }
    },
	computed: {
		title() {
			return this.brand + '' + this.product
		},
		image() {
			return this.variants[this.selectedVariant].varianImage
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity
		},
		onSale() {
			return this.brand + '' + this.product + '' + 'onSale'
		},
		shipping() {
			if(this.premium) {
				return "Free"
			}
			return 2.99
		}
	}
	
});

Vue.component('product-review', {
      template: `
        <form class="review-form" @submit.prevent="onSubmit">
			<p v-if="errors.length">
			  <b>Please correct the following error(s):</b>
			  <ul>
				<li v-for="error in errors">{{ error }}</li>
			  </ul>
			</p>
		  <p>
			<label for="name">Name:</label>
			<input id="name" v-model="name" placeholder="name">
		  </p>
		  
		  <p>
			<label for="review">Review:</label>      
			<textarea id="review" v-model="review"></textarea>
		  </p>
		  
		  <p>
			<label for="rating">Rating:</label>
			<select id="rating" v-model.number="rating">
			  <option>5</option>
			  <option>4</option>
			  <option>3</option>
			  <option>2</option>
			  <option>1</option>
			</select>
		  </p>
			  
		  <p>
			<input type="submit" value="Submit">  
		  </p>    
		
		</form>
      `,
      data() {
        return {
			name: null,
			review: null,
			rating: null,
			errors: []
		}
	},
	methods: {
		onSubmit() {
		  if(this.name && this.review && this.rating) {
			let productReview = {
			  name: this.name,
			  review: this.review,
			  rating: this.rating
			}
			this.$emit('review-submitted', productReview)
			this.name = null
			this.review = null
			this.rating = null
		  } else {
			if(!this.name) this.errors.push("Name required.")
			if(!this.review) this.errors.push("Review required.")
			if(!this.rating) this.errors.push("Rating required.")
		  }
		}
	}
});


var app = new Vue({
    el: '#app',
	data: {
		premium: false,
		cart: [],
		reviews: []
	},
	methods: {
		updateCart(id) {
			this.cart.push(id)
		},
		addReview(productReview) {
		  this.reviews.push(productReview)
		}
	}
  })