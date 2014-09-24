/** @jsx React.DOM */

var InstagramLogo = React.createClass({
  render: function(){
    return (
      <div className="icon instagram">
      </div>
    )
  }
});

var TwitterLogo = React.createClass({
  render: function(){
    return (
      <div className="icon twitter">
      </div>
    )
  }
});

var Username = React.createClass({
  render: function(){
    return (
        <h3>@{this.props.data}</h3>
    )
  }
});

var Tweet = React.createClass({
  render: function(){
    return (
        <p>{this.props.data}</p>
    )
  }
});

var Hashtag = React.createClass({
  render: function(){
    return (
        <h4>{this.props.data}</h4>
    )
  }
});

var InstagramBox = React.createClass({

  render: function() {
    var picture = this.props.contentItem
    var url = "url( " + picture.url + ")"
    return (
      <div className="tile insta" style={{backgroundImage: url}}>
        <InstagramLogo />
        <div className="infobox">
          <Username data={picture.username} />
          <Hashtag data={picture.hashtag} />
        </div>
      </div>
    )
  }
});

var TweetBox = React.createClass({
  render: function() {
    var tweet = this.props.contentItem
    return (
      <div className="tile tweet">
        <TwitterLogo data={tweet.logo} />
        <Username data={tweet.username} />
        <Tweet data={tweet.content} />
        <Hashtag data={tweet.hashtag} />
      </div>
    )
  }
})

var MainViewport = React.createClass({
  getInitialState: function() {
    return { content: [] }
  },

  render: function(){
    var contentBoxes = [];

    this.state.content.forEach(function(item) {
      if (item.contentType === "text") {
      contentBoxes.push(TweetBox({contentItem: item}))
      }
      else if (item.contentType === "image") {
        contentBoxes.push(InstagramBox({contentItem: item}))
      }
    })
    return (
        <div className="content-container">
          {contentBoxes}
        </div>
    )
  },

  componentDidMount: function() {
    $(Viewport).on("update",function(){
      this.setState({ content: Viewport.all() })
    }.bind(this));
  }
});

React.renderComponent(
  <MainViewport />,
  document.getElementById("granule-viewer")
)
