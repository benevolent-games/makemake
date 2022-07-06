
export const graphics = {

	alpha() {
		// fluent icon "cursor-20-filled"
		// mit licensed
		// https://github.com/microsoft/fluentui-system-icons/blob/master/LICENSE
		const image = new Image(32, 32)
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="white" stroke="black" d="M6.636 2.287A1 1 0 0 0 5 3.059v13.998c0 .927 1.15 1.355 1.756.655l3.524-4.073a1.5 1.5 0 0 1 1.134-.518h5.592c.938 0 1.36-1.176.636-1.772L6.636 2.287Z"/></svg>`
		image.src = `data:image/svg+xml;utf8,${svg}`
		return {
			image,
			offset: {
				top: -3,
				left: -8,
			},
		}
	},

	beta() {
		// bootstrap icon "cursor-fill"
		// mit licensed
		// https://github.com/twbs/icons/blob/main/LICENSE.md
		const image = new Image(32, 32)
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g transform="rotate(-90 8 8)"><path fill="white" stroke="black" d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694L.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/></g></svg>`
		image.src = `data:image/svg+xml;utf8,${svg}`
		return {
			image,
			offset: {
				top: -4,
				left: -5,
			},
		}
	},
}
