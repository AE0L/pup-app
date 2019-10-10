import moment from 'moment'

const CACHE_NAME = 'pup-app-data'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday']
const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
]

export function onLoad() {
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

export function updateCache(data) {
	localStorage.setItem(CACHE_NAME, JSON.stringify(data))
	return JSON.parse(localStorage.getItem(CACHE_NAME))
}