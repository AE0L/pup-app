import moment from 'moment'

import foodData from './FoodData'

const CACHE_NAME = 'pup-app-data'
const FOOD_CACHE_NAME = 'pup-app-food-data'

export function getData() {
	let cache = localStorage.getItem(CACHE_NAME) || null

	if (!cache) {
		let today = moment(new Date())
		let tomorrow = moment(new Date()).add(1, 'd')

		let data = {
			today: today.format('dddd'),
			tomorrow: tomorrow.format('dddd'),
			date_today: today.format(),
			date_tomorrow: tomorrow.format(),
			subjects: [],
		}

		localStorage.setItem(CACHE_NAME, JSON.stringify(data))

		return JSON.parse(localStorage.getItem(CACHE_NAME))
	} else {
		let date = moment(new Date())
		let newData = JSON.parse(localStorage.getItem(CACHE_NAME))

		newData.date_today = date.format()

		return updateCache(newData)
	}
}

export function getFoodData() {
	let cache = localStorage.getItem(FOOD_CACHE_NAME) || null

	if (!cache) {
		localStorage.setItem(FOOD_CACHE_NAME, JSON.stringify(foodData))
	}

	return JSON.parse(localStorage.getItem(FOOD_CACHE_NAME))
}

export function updateCache(data) {
	localStorage.setItem(CACHE_NAME, JSON.stringify(data))
	return JSON.parse(localStorage.getItem(CACHE_NAME))
}