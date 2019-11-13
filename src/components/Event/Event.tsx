import * as React from 'react';
import "./event.scss";
import classNames from "classnames";
import VideoCover from "react-video-cover";
import {CutText} from '@/components/CutText/CutText';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {IStore} from '@/redusers';
import {MapContainer} from '@/modules/Map/Map';

interface IEventProps extends IEvent {
    max?: boolean;
}

export const EventComponent = (props: IEventProps) => {
    const image = 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';
    const video = 'https://player.vimeo.com/external/368060467.sd.mp4?s=dfc819eb15c991554948480bfd4ca919b9023c65&profile_id=139&oauth2_token_id=57447761';
    return(
        <Link to={`/event/${props.id}`} className={classNames('event', { 'event_max': props.max })}>
            {image && !props.max ? <img className="event__img" src={image} /> : null}
                {video && props.max ? (
                    <div className="event__video">
                       <VideoCover
                           videoOptions={{
                               src: video,
                               autoPlay: true,
                               muted: true,
                               loop: true,
                           }}
                       />
                    </div>
                ) : null}
            <div className="event__content">
                <span className="event__type">Мероприятия</span>
                <h2 className="event__title">{props.title}</h2>
                <p className="event__description"><CutText text={props.description} maxCount={100} /></p>
            </div>
        </Link>
    );
};

export const Event = connect((store: IStore) => ({
}))(withRouter(EventComponent));
