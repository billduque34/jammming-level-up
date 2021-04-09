import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NewRelease.css';
import { fetchNewRelease, selectNewRelease } from './newReleaseSlice';
import { NewReleaseSong } from './NewReleaseSong/NewReleaseSong';

export function NewRelease(props) {
    const dispatch = useDispatch();
    const newRelease = useSelector(selectNewRelease);

    useEffect(() => {
        dispatch(fetchNewRelease());
    },[dispatch]);

    return (<div className="NewRelease">
                <h2>New Release</h2>
                <div className="new-release-grid">
                    {newRelease.map(song => <NewReleaseSong name={song.name} 
                                                            artists={song.artists} 
                                                            key={song.id}
                                                            uri={song.uri}
                                                            images={song.images}
                                                            setCurrentUri={props.setCurrentUri}
                        />)}
                </div>
            </div>);
}