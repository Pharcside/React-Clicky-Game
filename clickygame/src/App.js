import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

class App extends Component {
  state = {
    friends,
    clickedPoster: [],
    score: 0
  };

//when you click on a card ... the fish is taken out of the array
  imageClick = event => {
    const currentPoster = event.target.alt;
    const PosterAlreadyClicked =
      this.state.clickedPoster.indexOf(currentPoster) > -1;

//if you click on a fish that has already been selected, the game is reset and cards reordered
    if (PosterAlreadyClicked) {
      this.setState({
        fish: this.state.friends.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedPoster: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available fish, your score is increased and cards reordered
    } else {
      this.setState(
        {
          fish: this.state.friends.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedPoster: this.state.clickedPoster.concat(
            currentPoster
          ),
          score: this.state.score + 1
        },
//if you get all 12 fish corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              fish: this.state.frineds.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedPoster: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Wrapper> 
          
         <Title>
           <p>Peral Jam Poster Match</p>
         </Title>
          score={this.state.score}
        />
      
        <div className="wrapper">
          {this.state.friends.map(friends => (
            <FriendCard
              imageClick={this.imageClick}
              id={friends.id}
              key={friends.id}
              image={friends.image}
              name={friends.name}
            />
          ))}
        </div>
        </Wrapper>
      </div>
    );
  }
}

export default App;
