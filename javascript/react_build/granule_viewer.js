/** @jsx React.DOM */

var InstagramLogo = React.createClass({displayName: 'InstagramLogo',
  render: function(){
    return (
      React.DOM.div({className: "icon instagram"}
      )
    )
  }
});

var TwitterLogo = React.createClass({displayName: 'TwitterLogo',
  render: function(){
    return (
      React.DOM.div({className: "icon twitter"}
      )
    )
  }
});

var Username = React.createClass({displayName: 'Username',
  render: function(){
    return (
        React.DOM.h3(null, "@", this.props.data)
    )
  }
});

var Tweet = React.createClass({displayName: 'Tweet',
  render: function(){
    return (
        React.DOM.p(null, this.props.data)
    )
  }
});

var Hashtag = React.createClass({displayName: 'Hashtag',
  render: function(){
    return (
        React.DOM.h4(null, this.props.data)
    )
  }
});

var InstagramBox = React.createClass({displayName: 'InstagramBox',

  render: function() {
    var picture = this.props.contentItem
    var url = "url( " + picture.url + ")"
    return (
      React.DOM.div({className: "tile insta", style: {backgroundImage: url}}, 
        InstagramLogo(null), 
        React.DOM.div({className: "infobox"}, 
          Username({data: picture.username}), 
          Hashtag({data: picture.hashtag})
        )
      )
    )
  }
});

var TweetBox = React.createClass({displayName: 'TweetBox',
  render: function() {
    var tweet = this.props.contentItem
    return (
      React.DOM.div({className: "tile tweet"}, 
        TwitterLogo({data: tweet.logo}), 
        Username({data: tweet.username}), 
        Tweet({data: tweet.content}), 
        Hashtag({data: tweet.hashtag})
      )
    )
  }
})

var MainViewport = React.createClass({displayName: 'MainViewport',
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
        React.DOM.div({clasName: "content-container"}, 
          contentBoxes
        )
    )
  },

  componentDidMount: function() {
    $(Viewport).on("update",function(){
      this.setState({ content: Viewport.all() })
    }.bind(this));
  }
});

React.renderComponent(
  MainViewport(null),
  document.getElementById("granule-viewer")
)
