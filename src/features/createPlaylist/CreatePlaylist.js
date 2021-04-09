import { CreatePlaylistCard } from '../../components/CreatePlaylistPage/CreatePlaylistCard/CreatePlaylistCard';
import './CreatePlaylist.css';

export function CreatePlaylist(props) {
    return (<div className="CreatePlaylist">
                <input type="text" placeholder="Name your playlist" onChange={({target}) => props.setPlaylistName(target.value)} value={props.playlistName}/>
                <div className="track-list">
                    {props.playlistList.map(track => <CreatePlaylistCard track={track}
                                                                         key={track.id}
                                                                         setPlaylistList={props.setPlaylistList}
                                                                         isSearch={false}/>)}
                </div>
            </div>)
}