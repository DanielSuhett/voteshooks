import React from 'react'
import Footer from "../components/Footer";
export default function (props) {
  let background = '';
  return (
    <>
      <div className="container">
        <ul>
          {props.location.state.map((vote, index) =>
            <div key={index} className="subcontent">
              <span className="itemResult" style={{ backgroundColor: vote.voted === true ? 'rgb(35, 148, 35)' : 'gray' }} key={index}>
                {vote.title}<span>{vote.voted && <> { vote.countVotes }</>}</span>
              </span>
            </div>
          )}
        </ul>
      </div>
      <Footer />
    </>
  )
}
