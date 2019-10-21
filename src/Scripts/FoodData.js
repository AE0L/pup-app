const data = {
	list: [
		{
			name: 'Stall 23',
			menu: [
				{ food: 'Shawarma Rice', price: 43.00 },
				{
					food: 'Shawarma Pita',
					variants: [
						{ type: 'Regular', price: 40.00 },
						{ type: 'Large', price: 50.00 }
					]
				},
				{ food: 'Lumpiang Shanghai w/ Rice', price: 40.00 },
				{
					food: 'Drinks',
					variants: [
						{ type: 'Small', price: 15.00 },
						{ type: 'Medium', price: 20.00 },
						{ type: 'Large', price: 25.00 }
					]
				}
			]
		},

		{
			name: 'Stall 28',
			menu: [
				{
					food: 'Drinks',
					variants: [
						{ type: 'Small', price: 15.00 },
						{ type: 'Medium', price: 20.00 },
						{ type: 'Large', price: 25.00 }
					]
				}
			]
		},

		{
			name: 'Stall 29',
			menu: [
				{ food: 'Burger Steak', price: 25.00 },
				{ food: 'Mushroom Pepper Meatballs', price: 25.00 },
				{ food: 'Hongkong Meatballs', price: 25.00 },
				{ food: 'Zepo Egg', price: 35.00 },
				{ food: 'Chicken Fillet', price: 40.00 },
				{ food: 'Fish Fillet', price: 40.00 },
				{ food: 'Pork Sisig', price: 40.00 },
				{ food: 'Beef Tapa', price: 40.00 },
				{ food: 'Cheezy Beef', price: 45.00 },
				{ food: 'Chicken A la King', price: 45.00 }
			]
		},

		{
			name: 'Stall 31',
			menu: [
				{
					food: 'Shakes',
					variants: [
						{ type: 'Small', price: 45.00 },
						{ type: 'Regular', price: 55.00 },
						{ type: 'Large', price: 65.00 }
					]
				},

				{
					food: 'Fries',
					variants: [
						{ type: 'Medium', price: 35.00 },
						{ type: 'Large', price: 50.00 }
					]
				},

				{ food: 'CornDog', price: 15.00 }
			]
		}
	]
}

export default data