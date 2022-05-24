import React from "react";
import { createRoot } from "react-dom/client";
import { AiOutlineTwitter, AiOutlineMail } from "react-icons/ai";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { MdOutlineShuffle } from "react-icons/md";
// styles
import "./style.css";

const apiUrl = "https://previewer.saurabhv749.repl.co/quotes";
const colors = [
  "ffd166",
  "118ab2",
  "06d6a0",
  "ef476f",
  "3d5a80",
  "f08080",
  "ff595e",
  "f72585",
  "db3a34",
  "1a7431",
  "ff6d00",
  "084c61",
  "084c61",
  "a4133c",
  "e09f3e",
  "0d3b66",
];
const getColor = () => "#" + colors[Math.floor(Math.random() * colors.length)];

function QuoteGenerator() {
  const [lines, setLines] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [quote, setQuote] = React.useState(null);

  React.useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const { quotes } = data;
        setLines(quotes);
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        document.body.style.setProperty("--base-color", getColor());
        setLoading(false);
      });
  }, []);

  function Change() {
    setQuote(lines[Math.floor(Math.random() * lines.length)]);

    document.body.style.setProperty("--base-color", getColor());
  }

  return (
    <>
      <h1>Random Quote Generator</h1>
      <section id="quote-box">
        {loading ? (
          <p id="text"> Loading ... </p>
        ) : (
          <>
            <FaQuoteLeft size={30} />
            <p id="text"> {quote && quote.text} </p>
            <FaQuoteRight size={30} />

            <strong>
              {" "}
              <h2 id="author">- {quote && quote.author} </h2>
            </strong>
            <section className="nav">
              <a
                title="Tweet This"
                href="twitter.com/intent/tweet"
                target="_blank"
                id="tweet-quote"
              >
                <AiOutlineTwitter />
              </a>
              <a
                title="Mail"
                href="mailto:saurabhv_awesome@gmail.com"
                target="_blank"
              >
                <AiOutlineMail />
              </a>
              <a
                href="##"
                title="random-quote"
                id="new-quote"
                onClick={() => Change()}
              >
                <MdOutlineShuffle />
              </a>
            </section>
          </>
        )}
      </section>
    </>
  );
}

let renderer = createRoot(document.getElementById("root"));
renderer.render(<QuoteGenerator />);
