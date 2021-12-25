import axios from "axios";

export default axios.create({
	baseURL: "https://api.unsplash.com/photos/",
	headers: {
		Authorization: "Client-ID UyaEVsAi7kb1mc8knbI0eeB7jIeS2dxnDmNt6bsd76U",
	},
});
