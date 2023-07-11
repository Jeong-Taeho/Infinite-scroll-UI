const API_END_POINT = "https://kdt-frontend.programmers.co.kr"
export const request = async url => {
	try {
		const res = await fetch(`${API_END_POINT}${url}`)
		if (res.ok) {
			return await res.json()
		}
		throw new Error("요청에 실패 했습니다")
	} catch (e) {
		alert(e.message)
	}
}
