import React, { Component } from "react";
import styled from "styled-components";
import randomMC from "random-material-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { randomArrayValue } from "../helpers";
import "./App.scss";
let quotes;

const StyledButton = styled.button`
  cursor: pointer;
  color: white;
  background: var(--primary);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  transition: 0.2s all ease;
  &:hover {
    transform: translateX(5px);
    background: ${props => (props.hover ? "white" : "")};
  }
  &:hover > a {
    color: ${props => (props.hover ? "#1da1f2" : "")};
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateX(15px);
  }
  margin-left: ${props => (props.alignEnd ? "auto" : "")};
  font-size: ${props => (props.small ? "0.8rem" : "1rem")};
`;

const QuoteBox = styled.p`
  position: relative;
  font-size: 2.5rem;
  text-indent: 50px;
  margin: 1rem auto;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  &::before {
    content: open-quote;
    font-size: 120px;
    font-weight: bold;
    line-height: 120px;
    left: -55px;
    top: 0;
    position: absolute;
    width: 70px;
  }
  &::after {
    content: close-quote;
    font-weight: bold;
  }
  @media screen and (max-width: 500px) {
    font-size: 2rem;
  }
  a > & {
    color: inherit;
    border: none;
  }
`;
const Link = styled.a`
  color: inherit;
  text-decoration: none;
`;
const Author = styled.h5`
  margin-top: 0;
  margin-bottom: 3rem;
  text-transform: uppercase;
`;

const TweetIcon = styled(FontAwesomeIcon)`
  position: relative;
  transition: 0.3s all ease;
  ${Link}:hover & {
    color: #1da1f2;
  }
  ${StyledButton}:hover {
    background-color: white;
  }
`;
class Quote extends Component {
  render() {
    return (
      <div className="quote-wrapper">
        <QuoteBox>{this.props.quote}</QuoteBox>

        <Author>— {this.props.author}</Author>
      </div>
    );
  }
}

class App extends Component {
  state = {
    data: "",
    quote:
      "One can be instructed in society, one is inspired only in solitude.",
    author: "Ohann Wolfgang von Goethe ",
    tweet:
      "https://twitter.com/intent/tweet?text=One can be instructed in society, one is inspired only in solitude."
  };
  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then(response => response.json())
      .then(data => (quotes = data))
      .then(() => this.setState({ data: quotes.quotes }));
  }

  handleNextQuote = () => {
    const quotes = this.state.data;
    const randomColor = randomMC.getColor();
    document.documentElement.style.setProperty("--primary", randomColor);
    let randomQuote = randomArrayValue(quotes);
    const tweet = `https://twitter.com/intent/tweet?text=${
      randomQuote.quote
    } — ${randomQuote.author}`;
    this.setState({
      quote: randomQuote.quote,
      author: randomQuote.author,
      tweet
    });
  };

  render() {
    const tweetURL = this.state.tweet;
    return (
      <div className="container">
        <Quote quote={this.state.quote} author={this.state.author} />
        <div className="row">
          <StyledButton small hover>
            {/* <Link href="#">Tweet it</Link> */}
            <Link href={tweetURL} target="_blank">
              <TweetIcon icon={faTwitter} size="2x" />
            </Link>
          </StyledButton>
          <StyledButton alignEnd onClick={this.handleNextQuote}>
            Next Quote{" "}
            <FontAwesomeIcon
              icon={faCircleNotch}
              size="1x"
              pulse
              style={{ fontWeight: "300" }}
            />
          </StyledButton>
        </div>

        <Credit>
          Made with{" "}
          <FontAwesomeIcon
            icon={faHeart}
            pulse
            style={{ color: "#f44336", opacity: "1" }}
          />{" "}
          by{" "}
          <Link
            href="http://imsolitude.github.io"
            style={{ color: "rgba(255, 255, 255, 1)" }}
          >
            muhammadj
          </Link>
        </Credit>
      </div>
    );
  }
}

const Credit = styled.h3`
  position: absolute;
  bottom: -40px;
  left: 0;
  color: rgba(255, 255, 255, 0.5);
  font-family: "Karla", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: 0.8rem;
`;

export default App;
