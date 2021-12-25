import React from "react";
import Card from "../../components/Card/Card.components";
import "./PlayPage.styles.css";
import CustomButton from "../../components/CustomButton/CustomButton.components";
class PlayPage extends React.Component {
	confirmationMenuRef = React.createRef();
	revealAnswer = () => {
		this.props.cardRef.current.classList.add("flipped");
		this.confirmationMenuRef.current.classList.remove("hidden");
		this.props.cardRef.current.children[1].classList.remove("text-hidden");
	};
	hideAnswer = () => {
		this.props.cardRef.current.classList.remove("flipped");
		this.confirmationMenuRef.current.classList.add("hidden");
		this.props.cardRef.current.children[1].classList.add("text-hidden");
	};
	render() {
		if (this.props.completed >= this.props.maxCards && this.props.maxCards > 0)
			return (
				<div>
					<div className="main-container">
						<h2>Congratulations ,You have finished all your cards</h2>
						<p className="correct-text">
							Correct Answers: {this.props.completed}/{this.props.maxCards}
						</p>
						<CustomButton
							text="Reshuffle"
							className="shuffle-btn"
							onClick={this.props.onShuffle}
						></CustomButton>
					</div>
				</div>
			);
		else {
			return (
				<div className="main-container">
					<Card
						cardRef={this.props.cardRef}
						question={this.props.currentCard.question}
						answer={this.props.currentCard.answer}
					/>
					<div className="button-container">
						<CustomButton text="New Card" onClick={this.props.onNewCard} className="new-card-btn" />
						<CustomButton text="Reveal Answer" onClick={this.revealAnswer} className="reveal-btn" />
					</div>
					<div className="answer-confirmation hidden" ref={this.confirmationMenuRef}>
						<p className="answer-header">Did you get that one?</p>
						<div className="button-container">
							<CustomButton
								text="Yes"
								onClick={() => {
									this.hideAnswer();
									this.props.onConfirm();
								}}
								className="confirm-btn"
							/>
							<CustomButton
								text="No"
								onClick={() => {
									this.hideAnswer();
									this.props.onNewCard();
								}}
								className="cancel-btn"
							/>
						</div>
					</div>
					<p className="correct-text">
						Correct Answers: {this.props.completed}/{this.props.maxCards}
					</p>
				</div>
			);
		}
	}
}
export default PlayPage;
