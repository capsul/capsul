/** @jsx React.DOM */

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

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

var CreatedAt = React.createClass({displayName: 'CreatedAt',
  render: function(){
    return (
        React.DOM.h6(null, this.props.data)
    )
  }
});

var InstagramBox = React.createClass({displayName: 'InstagramBox',

  render: function() {
    var picture = this.props.data
    var url = "url( " + picture.url + ")"
    return (
      React.DOM.div({className: "tile insta", style: {backgroundImage: url}}, 
        InstagramLogo(null), 
        React.DOM.div({className: "infobox"}, 
          Username({data: picture.username}), 
          Hashtag({data: picture.hashtag}), 
          CreatedAt({data: picture.createdAt})
        )
      )
    )
  }
});

var TweetBox = React.createClass({displayName: 'TweetBox',
  mixins: [SetIntervalMixin],
  setVisibilities: function(bundle) {
    visibilities = []
    visibilities.push('reveal')
    if (bundle.length > 1) {
      for (var el = 0; el < bundle.length-1; el ++) {
        visibilities.push('conceal')
      }
    }
    return visibilities
  },
  getInitialState: function() {
    return {
      slideVisibilities: this.setVisibilities(this.props.data)
    }
  },
  rotateSlides: function(){
    var currentVisibilities = this.state.slideVisibilities
    var lastVisibility = currentVisibilities.pop()
    currentVisibilities.unshift(lastVisibility)
    this.setState({slideVisibilities: currentVisibilities})
  },
  componentDidMount: function() {
    this.timeout = setTimeout(function() {
      this.setInterval(this.rotateSlides, 5000);
    }.bind(this), Math.floor(Math.random()*(5000-0+1)+0))
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({slideVisibilities: this.setVisibilities(nextProps.data)})
  },
  componentWillUnmount: function() {
    clearInterval(this.interval)
  },
  render: function() {
    var viz = this.state.slideVisibilities
    return (
      React.DOM.div({className: "tile tweet"}, 
        this.props.data.map(function(slideContent, index) {
            return TweetSlide({key: slideContent.id, data: slideContent, visibility: viz[index]})
          }
        )
      )
    )
  }
});

var TweetSlide = React.createClass({displayName: 'TweetSlide',
  render: function() {
    var tweet = this.props.data
    var visibility = this.props.visibility
    return (
      React.DOM.div({className: "tweet-slide " + visibility}, 
        TwitterLogo({data: tweet.logo}), 
        Username({data: tweet.username}), 
        Tweet({data: tweet.content}), 
        CreatedAt({data: tweet.createdAt})
      )
    )
  }
});

var MainViewport = React.createClass({displayName: 'MainViewport',
  getInitialState: function() {
    return { granules: [] }
  },

  render: function(){
    return (
      React.DOM.div({className: "content-container"}, 
        this.state.granules.map(function(bundle){
          var firstGranule = bundle[0]
          if (firstGranule.contentType === "text") {
            return TweetBox({key: "key-slidecontainer-"+firstGranule.id, data: bundle})
          }
          else if (firstGranule.contentType === "image") {
            return InstagramBox({key: "key-"+firstGranule.id, data: firstGranule})
          }
        })
      )
    )
  },

  componentDidMount: function() {
    $(Viewport).on("update",function(){
      this.setState({ granules: Viewport.all() })
    }.bind(this));
  }
});

React.renderComponent(
  MainViewport(null),
  document.getElementById("granule-viewer")
)
