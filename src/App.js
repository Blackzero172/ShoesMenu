import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import EditPage from "./pages/EditPage/EditPage.pages";
import PlayPage from "./pages/PlayPage/PlayPage.pages";
import Spinner from "./components/Spinner/Spinner.components";
import Header from "./components/Header/Header.components";
import api from "./components/API/api";
class App extends React.Component {
	state = { loading: true, cards: [], completed: 0, currentCard: {} };
	spinnerRef = React.createRef();
	showHideSpinner = () => {
		if (this.state.loading) this.spinnerRef.current.classList.remove("hidden");
		else if (!this.state.loading) this.spinnerRef.current.classList.add("hidden");
	};
	getData = async () => {
		this.setState({ loading: true }, this.showHideSpinner);
		const res = await api.get();
		this.setState({ loading: false, cards: res.data }, () => {
			this.showHideSpinner();
			this.getNewCard();
		});
	};
	getNewCard = () => {
		const filteredCards = this.state.cards.filter((card) => card.isAnswered === false);
		if (filteredCards.length > 1) {
			let randomNum = Math.floor(Math.random() * filteredCards.length);
			let randomCard = filteredCards[randomNum];
			if (randomCard === this.state.currentCard) {
				randomNum = Math.floor(Math.random() * filteredCards.length);
				randomCard = this.state.cards[randomNum];
			} else {
				this.setState({ currentCard: randomCard });
			}
		}
	};
	componentDidMount() {
		this.getData();
	}
	confirmAnswer = () => {
		if (this.state.completed < this.state.cards.length) {
			const cards = [...this.state.cards];
			const currentCard = cards.find((card) => card.id === this.state.currentCard.id);
			currentCard.isAnswered = true;
			this.setState({ completed: this.state.completed + 1, cards }, this.getNewCard);
		}
	};
	setLoading = () => {
		this.setState({ loading: true }, this.showHideSpinner);
	};
	render() {
		return (
			<BrowserRouter>
				<Header />
				<Route path="/cards">
					<EditPage cards={this.state.cards} getData={this.getData} setLoading={this.setLoading} />
				</Route>
				<Route path="/" exact>
					<PlayPage
						maxCards={this.state.cards.length}
						completed={this.state.completed}
						onConfirm={this.confirmAnswer}
						onNewCard={this.getNewCard}
						currentCard={this.state.currentCard}
					/>
				</Route>
				<Spinner spinnerRef={this.spinnerRef} />
			</BrowserRouter>
		);
	}
}
export default App;
