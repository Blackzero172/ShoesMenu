import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import EditPage from "./pages/EditPage/EditPage.pages";
import PlayPage from "./pages/PlayPage/PlayPage.pages";
import Spinner from "./components/Spinner/Spinner.components";
import Header from "./components/Header/Header.components";
import api from "./components/API/api";
class App extends React.Component {
	state = { loading: true, cards: [], completed: 0, currentCard: {} };
	cardRef = React.createRef();
	spinnerRef = React.createRef();
	firstLoadUp = false;
	showHideSpinner = () => {
		if (this.state.loading) this.spinnerRef.current.classList.remove("hidden");
		else if (!this.state.loading) this.spinnerRef.current.classList.add("hidden");
	};
	getData = async () => {
		this.setState({ loading: true }, this.showHideSpinner);
		const res = await api.get();
		this.setState({ loading: false, cards: res.data }, () => {
			this.showHideSpinner();
			if (!this.firstLoadUp) {
				this.getNewCard();
				this.firstLoadUp = true;
			}
		});
	};
	getNewCard = () => {
		if (this.cardRef.current !== null)
			if (!this.cardRef.current.classList.contains("flipped")) {
				const filteredCards = this.state.cards.filter((card) => card.isAnswered === false);
				if (filteredCards.length > 0) {
					let randomNum = Math.floor(Math.random() * filteredCards.length);
					let randomCard = filteredCards[randomNum];
					while (randomNum === filteredCards.indexOf(this.state.currentCard)) {
						randomNum = Math.floor(Math.random() * filteredCards.length);
						randomCard = filteredCards[randomNum];
					}
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
	shuffleCards = () => {
		const cards = this.state.cards;
		cards.forEach((card) => {
			card.isAnswered = false;
		});
		this.setState({ cards, completed: 0 });
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
						onShuffle={this.shuffleCards}
						cardRef={this.cardRef}
					/>
				</Route>
				<Spinner spinnerRef={this.spinnerRef} />
			</BrowserRouter>
		);
	}
}
export default App;
