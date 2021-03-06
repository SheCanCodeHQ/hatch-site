import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { generate } from "shortid";
import Feed from "./Feed";
import Card from "./Card";

class FeedContainer extends Component {
  static mapStateToProps = state => ({
    competition: state.competition.competition,
    isFetching: state.competition.isFetching,
  });

  static propTypes = {
    competition: PropTypes.shape(),
    isFetching: PropTypes.bool,
    fetchCompetition: PropTypes.func,
  };

  static defaultProps = {
    competition: {},
    isFetching: false,
    fetchCompetition: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      feedItems: this.generateFeedItems(props.competition),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFetching && !this.props.isFetching) {
      this.setState({ feedItems: [] });
    }

    if (!nextProps.isFetching && this.props.isFetching) {
      this.setState({
        feedItems: this.generateFeedItems(nextProps.competition),
      });
      this.forceUpdate();
    }
  }

  generateFeedItems = competition => {
    if (!competition.name && !competition.start_time) {
      return [
        {
          type: "informational",
          title: "No event found",
          children: (
            <p>
              It looks like you aren{"'"}t currently attending an event. Contact
              an organiser if you think this isn{"'"}t the case.
            </p>
          ),
        },
      ];
    }

    const eventHasStarted =
      Date.now() - Date.parse(competition.start_time) >= 0;
    const eventHasEnded = Date.now() - Date.parse(competition.end_time) >= 0;
    const feedItems = [];

    if (!eventHasEnded) {
      if (!eventHasStarted) {
        feedItems.push({
          type: "countdown",
          startTime: competition.start_time || "",
          name: competition.name,
        });
      } else {
        feedItems.push({
          type: "currentEvents",
          competitionStart: competition.start_time || "",
          competitionEnd: competition.end_time || "",
          currentEvent: competition.current_event || {},
          nextEvent: competition.next_event || {},
        });
      }
      if (competition.location) {
        feedItems.push({
          type: "directions",
          location: competition.location,
          latitude: competition.latitude,
          longitude: competition.longitude,
        });
      }
    } else {
      feedItems.push({
        type: "informational",
        title: `Thanks for attending ${competition.name}!`,
        children: (
          <p>
            Photos and media will be on our website shortly. Keep an eye on our
            social media for more information!
          </p>
        ),
      });
    }

    if ("Notification" in window) {
      if (Notification.permission !== "granted") {
        feedItems.push({
          type: "notificationPermission",
          onGranted: () =>
            this.setState({
              feedItems: this.generateFeedItems(this.props.competition),
            }),
        });
      }
    }

    return feedItems;
  };
  render() {
    // map cards to their respective drawables.
    const cards = this.state.feedItems.map(item => (
      <Card key={generate()} {...item} />
    ));

    return (
      <div>
        {this.props.isFetching && (
          <h3 className="help-text">Loading Feed...</h3>
        )}
        <Feed>{cards}</Feed>
      </div>
    );
  }
}

export default connect(FeedContainer.mapStateToProps)(FeedContainer);
