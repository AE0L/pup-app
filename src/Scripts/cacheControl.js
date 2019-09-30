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
		let date = new Date()
		let tomDate = new Date()
		tomDate.setDate(tomDate.getDate() + 1)
		let today = `${months[date.getMonth()]}. ${date.getDate()}, ${date.getFullYear()}`
		let tomorrow = `${months[tomDate.getMonth()]}. ${tomDate.getDate()}, ${tomDate.getFullYear()}`
		let day = days[date.getDay()]
		let dayTom = days[tomDate.getDay()]

		let data = {
			day_today: day,
			day_tomorrow: dayTom,
			date_today: today,
			date_tomorrow: tomorrow,
			subjects: [],
		}

		localStorage.setItem(CACHE_NAME, JSON.stringify(data))

		return JSON.parse(localStorage.getItem(CACHE_NAME))
	} else {
		let date = new Date()
		let newData = JSON.parse(localStorage.getItem(CACHE_NAME))
		let today = `${months[date.getMonth()]}. ${date.getDate()}, ${date.getFullYear()}`

		newData.day_today = days[date.getDay()]
		newData.date_today = today

		return updateCache(newData)
	}
}

export function updateCache(data) {
	localStorage.setItem(CACHE_NAME, JSON.stringify(data))
	return JSON.parse(localStorage.getItem(CACHE_NAME))
}