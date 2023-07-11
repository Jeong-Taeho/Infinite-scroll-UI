export default function PhotoList({ $target, initialState, onScrollEnded }) {
	const $photoList = document.createElement("div")
	$target.appendChild($photoList)

	let isInitalize = false

	this.state = initialState

	this.setState = nextState => {
		this.state = nextState
		this.render()
	}

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !this.state.isLoading) {
					console.log(entry.target)
					if (this.state.totalCount > this.state.photos.length) {
						onScrollEnded()
					}
				}
			})
		},
		{
			threshold: 0.5,
		}
	)

	let $lastLi = null

	this.render = () => {
		if (!isInitalize) {
			$photoList.innerHTML = `
                <ul class="PhotoList_photos"></ul>
                `
			isInitalize = true
		}

		const $photos = $photoList.querySelector(".PhotoList_photos")
		const { photos } = this.state

		photos.forEach(photo => {
			if ($photos.querySelector(`li[data-id="${photo.id}"]`) === null) {
				const $li = document.createElement("li")
				$li.setAttribute("data-id", photo.id)
				$li.style = "list-style:none; min-height: 500px"
				$li.innerHTML = `<img src="${photo.imagePath}" style="width:100%" /> `

				$photos.appendChild($li)
			}
		})

		const $nextLi = $photos.querySelector("li:last-child")

		if ($nextLi !== null) {
			if ($lastLi !== null) {
				observer.unobserve($lastLi)
			}

			$lastLi = $nextLi
			observer.observe($lastLi)
		}
	}

	this.render()

	window.addEventListener("scroll", () => {
		const { isLoading, totalCount, photos } = this.state

		const isScrollEnded = window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight

		if (isScrollEnded && !isLoading && photos.length < totalCount) {
			onScrollEnded()
		}
	})
}
