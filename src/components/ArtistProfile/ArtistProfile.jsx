import styles from './ArtistProfile.module.css';
import SpotifyIcon from '../SpotifyIcon';
import api from '../../api/_api';
import { useState } from 'react';


const artistSample = {
    title: "Interpol",
    id: "",
    imageUrl: "https://i.scdn.co/image/ab6761610000e5ebc31f8e7aad462874455cf070",
    genres: [],
    spotifyUrl: "",
    reviews: [
        {
            user: 'test2',
            rating: 10,
            date: '01/01/2025',
            message: 'The Killers with better production, worse lyrics, and low-level depression.',
            likes: 53,
        },
        {
            user: 'xxWinstonxx',
            rating: 8,
            date: '01/01/2025',
            message: '',
            likes: 0,
        },
        {
            user: 'joyless_loser',
            rating: 5,
            date: '01/01/2025',
            message: 'Overrated. Pitchfork gave them album of the year for a fluke record with one really good song (Obstacle 1, duh), and everybody insisted they were the next Joy Division.',
            likes: 2,
        }
    ],
    albums: [
        {
            "title": "Turn on the Bright Lights",
            "tracks": 11,
            "duration": "48:00",
            "imageUrl": "https://example.com/turn-on-the-bright-lights.jpg",
            "popularity": 85,
            "releaseDate": "08/20/2002",
            "year": 2002,
            "items": [
                {
                    "title": "Untitled",
                    "order": 1,
                    "duration": "3:56",
                    "popularity": 78,
                    "reviews": [
                        {
                            "user": "user_2301",
                            "rating": 6,
                            "date": "04/07/2024",
                            "message": "",
                            "likes": 81
                        },
                        {
                            "user": "test2",
                            "rating": 8,
                            "date": "06/02/2024",
                            "message": "",
                            "likes": 45
                        }
                    ]
                },
                {
                    "title": "Obstacle 1",
                    "order": 2,
                    "duration": "4:11",
                    "popularity": 92,
                    "reviews": [
                        {
                            "user": "user_2102",
                            "rating": 7,
                            "date": "12/26/2024",
                            "message": "",
                            "likes": 27
                        }
                    ]
                },
                {
                    "title": "NYC",
                    "order": 3,
                    "duration": "4:20",
                    "popularity": 85,
                    "reviews": [
                        {
                            "user": "user_1793",
                            "rating": 7,
                            "date": "03/01/2024",
                            "message": "",
                            "likes": 15
                        }
                    ]
                },
                {
                    "title": "PDA",
                    "order": 4,
                    "duration": "5:00",
                    "popularity": 88,
                    "reviews": [
                        {
                            "user": "user_2563",
                            "rating": 8,
                            "date": "11/12/2024",
                            "message": "",
                            "likes": 17
                        },
                        {
                            "user": "user_9091",
                            "rating": 4,
                            "date": "10/15/2024",
                            "message": "",
                            "likes": 24
                        }
                    ]
                },
                {
                    "title": "Say Hello to the Angels",
                    "order": 5,
                    "duration": "4:28",
                    "popularity": 72,
                    "reviews": [
                        {
                            "user": "user_2499",
                            "rating": 3,
                            "date": "06/17/2024",
                            "message": "",
                            "likes": 15
                        },
                        {
                            "user": "user_6542",
                            "rating": 4,
                            "date": "07/02/2024",
                            "message": "",
                            "likes": 0
                        }
                    ]
                },
                {
                    "title": "Hands Away",
                    "order": 6,
                    "duration": "3:05",
                    "popularity": 65,
                    "reviews": [
                        {
                            "user": "test2",
                            "rating": 8,
                            "date": "06/05/2024",
                            "message": "",
                            "likes": 14
                        },
                        {
                            "user": "test2",
                            "rating": 4,
                            "date": "11/18/2024",
                            "message": "",
                            "likes": 9
                        }
                    ]
                },
                {
                    "title": "Obstacle 2",
                    "order": 7,
                    "duration": "3:38",
                    "popularity": 75,
                    "reviews": [
                        {
                            "user": "user_6246",
                            "rating": 7,
                            "date": "06/11/2024",
                            "message": "",
                            "likes": 26
                        },
                        {
                            "user": "user_3256",
                            "rating": 3,
                            "date": "02/13/2024",
                            "message": "",
                            "likes": 5
                        }
                    ]
                },
                {
                    "title": "Stella Was a Diver and She Was Always Down",
                    "order": 8,
                    "duration": "6:27",
                    "popularity": 83,
                    "reviews": [
                        {
                            "user": "user_3037",
                            "rating": 5,
                            "date": "06/20/2024",
                            "message": "I don't understand the hype, it's just okay.",
                            "likes": 59
                        },
                        {
                            "user": "user_4105",
                            "rating": 4,
                            "date": "01/09/2025",
                            "message": "",
                            "likes": 47
                        }
                    ]
                },
                {
                    "title": "Roland",
                    "order": 9,
                    "duration": "3:35",
                    "popularity": 70,
                    "reviews": [
                        {
                            "user": "user_9098",
                            "rating": 1,
                            "date": "12/01/2024",
                            "message": "",
                            "likes": 18
                        },
                        {
                            "user": "user_8654",
                            "rating": 6,
                            "date": "12/03/2024",
                            "message": "",
                            "likes": 13
                        },
                        {
                            "user": "user_5409",
                            "rating": 5,
                            "date": "01/28/2024",
                            "message": "",
                            "likes": 21
                        },
                        {
                            "user": "test2",
                            "rating": 6,
                            "date": "06/20/2024",
                            "message": "",
                            "likes": 28
                        }
                    ]
                },
                {
                    "title": "The New",
                    "order": 10,
                    "duration": "6:07",
                    "popularity": 78,
                    "reviews": [
                        {
                            "user": "user_6900",
                            "rating": 6,
                            "date": "08/19/2024",
                            "message": "",
                            "likes": 33
                        },
                        {
                            "user": "user_2047",
                            "rating": 4,
                            "date": "09/27/2024",
                            "message": "",
                            "likes": 47
                        },
                        {
                            "user": "user_2898",
                            "rating": 4,
                            "date": "10/15/2024",
                            "message": "",
                            "likes": 16
                        }
                    ]
                },
                {
                    "title": "Leif Erikson",
                    "order": 11,
                    "duration": "4:00",
                    "popularity": 80,
                    "reviews": [
                        {
                            "user": "user_2831",
                            "rating": 1,
                            "date": "02/16/2024",
                            "message": "Every track on this album is gold!",
                            "likes": 19
                        },
                        {
                            "user": "user_1171",
                            "rating": 2,
                            "date": "02/19/2024",
                            "message": "",
                            "likes": 81
                        },
                        {
                            "user": "user_5291",
                            "rating": 9,
                            "date": "10/28/2024",
                            "message": "",
                            "likes": 45
                        }
                    ]
                }
            ],
            "reviews": [
                {
                    "user": "user_6375",
                    "rating": 4,
                    "date": "09/25/2024",
                    "message": "",
                    "likes": 86
                },
                {
                    "user": "user_6097",
                    "rating": 9,
                    "date": "12/02/2024",
                    "message": "The guitars on this one hit differently.",
                    "likes": 87
                }
            ]
        },
        {
            "title": "Antics",
            "tracks": 10,
            "duration": "41:39",
            "imageUrl": "https://example.com/antics.jpg",
            "popularity": 88,
            "releaseDate": "09/27/2004",
            "year": 2004,
            "items": [
                {
                    "title": "Next Exit",
                    "order": 1,
                    "duration": "3:21",
                    "popularity": 80,
                    "reviews": [
                        {
                            "user": "user_4987",
                            "rating": 4,
                            "date": "03/10/2024",
                            "message": "The guitars on this one hit differently.",
                            "likes": 19
                        },
                        {
                            "user": "user_4869",
                            "rating": 3,
                            "date": "06/23/2024",
                            "message": "",
                            "likes": 13
                        }
                    ]
                },
                {
                    "title": "Evil",
                    "order": 2,
                    "duration": "3:36",
                    "popularity": 95,
                    "reviews": [
                        {
                            "user": "user_9498",
                            "rating": 6,
                            "date": "10/26/2024",
                            "message": "",
                            "likes": 15
                        }
                    ]
                },
                {
                    "title": "Narc",
                    "order": 3,
                    "duration": "4:08",
                    "popularity": 85,
                    "reviews": []
                },
                {
                    "title": "Take You on a Cruise",
                    "order": 4,
                    "duration": "4:54",
                    "popularity": 82,
                    "reviews": [
                        {
                            "user": "user_8691",
                            "rating": 3,
                            "date": "05/15/2024",
                            "message": "",
                            "likes": 33
                        },
                        {
                            "user": "user_3411",
                            "rating": 1,
                            "date": "08/23/2024",
                            "message": "The guitars on this one hit differently.",
                            "likes": 73
                        },
                        {
                            "user": "user_2207",
                            "rating": 7,
                            "date": "12/08/2024",
                            "message": "The best record I've heard all year.",
                            "likes": 57
                        },
                        {
                            "user": "user_1209",
                            "rating": 2,
                            "date": "09/17/2024",
                            "message": "",
                            "likes": 9
                        }
                    ]
                },
                {
                    "title": "Slow Hands",
                    "order": 5,
                    "duration": "3:04",
                    "popularity": 90,
                    "reviews": [
                        {
                            "user": "user_6634",
                            "rating": 5,
                            "date": "01/06/2024",
                            "message": "",
                            "likes": 88
                        },
                        {
                            "user": "user_5233",
                            "rating": 2,
                            "date": "01/21/2024",
                            "message": "",
                            "likes": 9
                        },
                        {
                            "user": "test2",
                            "rating": 6,
                            "date": "11/25/2024",
                            "message": "I don't understand the hype, it's just okay.",
                            "likes": 97
                        },
                        {
                            "user": "user_8894",
                            "rating": 7,
                            "date": "11/17/2024",
                            "message": "",
                            "likes": 27
                        }
                    ]
                },
                {
                    "title": "Not Even Jail",
                    "order": 6,
                    "duration": "5:47",
                    "popularity": 79,
                    "reviews": [
                        {
                            "user": "user_6733",
                            "rating": 8,
                            "date": "09/22/2024",
                            "message": "",
                            "likes": 63
                        },
                        {
                            "user": "user_8484",
                            "rating": 2,
                            "date": "03/13/2024",
                            "message": "The best record I've heard all year.",
                            "likes": 17
                        },
                        {
                            "user": "user_7509",
                            "rating": 5,
                            "date": "09/03/2024",
                            "message": "",
                            "likes": 46
                        }
                    ]
                },
                {
                    "title": "Public Pervert",
                    "order": 7,
                    "duration": "4:40",
                    "popularity": 76,
                    "reviews": [
                        {
                            "user": "user_1438",
                            "rating": 7,
                            "date": "01/17/2024",
                            "message": "",
                            "likes": 90
                        },
                        {
                            "user": "user_1150",
                            "rating": 9,
                            "date": "06/10/2024",
                            "message": "The guitars on this one hit differently.",
                            "likes": 66
                        },
                        {
                            "user": "user_3383",
                            "rating": 5,
                            "date": "01/30/2024",
                            "message": "",
                            "likes": 13
                        }
                    ]
                },
                {
                    "title": "C'mere",
                    "order": 8,
                    "duration": "3:11",
                    "popularity": 87,
                    "reviews": [
                        {
                            "user": "user_3640",
                            "rating": 3,
                            "date": "09/04/2024",
                            "message": "Disappointed\u2014expected more from this band.",
                            "likes": 49
                        },
                        {
                            "user": "user_6659",
                            "rating": 1,
                            "date": "11/07/2024",
                            "message": "",
                            "likes": 49
                        },
                        {
                            "user": "user_5964",
                            "rating": 4,
                            "date": "01/28/2024",
                            "message": "",
                            "likes": 33
                        }
                    ]
                },
                {
                    "title": "Length of Love",
                    "order": 9,
                    "duration": "4:06",
                    "popularity": 75,
                    "reviews": [
                        {
                            "user": "test2",
                            "rating": 5,
                            "date": "03/07/2024",
                            "message": "",
                            "likes": 13
                        },
                        {
                            "user": "user_6119",
                            "rating": 5,
                            "date": "02/28/2024",
                            "message": "",
                            "likes": 11
                        },
                        {
                            "user": "test2",
                            "rating": 10,
                            "date": "01/08/2024",
                            "message": "Every track on this album is gold!",
                            "likes": 3
                        }
                    ]
                },
                {
                    "title": "A Time to Be So Small",
                    "order": 10,
                    "duration": "4:49",
                    "popularity": 72,
                    "reviews": [
                        {
                            "user": "user_4365",
                            "rating": 9,
                            "date": "04/09/2024",
                            "message": "",
                            "likes": 10
                        }
                    ]
                }
            ],
            "reviews": [
                {
                    "user": "user_7573",
                    "rating": 7,
                    "date": "06/30/2024",
                    "message": "",
                    "likes": 77
                },
                {
                    "user": "user_3148",
                    "rating": 2,
                    "date": "02/11/2024",
                    "message": "",
                    "likes": 80
                },
                {
                    "user": "test2",
                    "rating": 6,
                    "date": "09/21/2024",
                    "message": "",
                    "likes": 30
                }
            ]
        },
        {
            "title": "Our Love to Admire",
            "tracks": 11,
            "duration": "54:00",
            "imageUrl": "https://example.com/our-love-to-admire.jpg",
            "popularity": 80,
            "releaseDate": "07/10/2007",
            "year": 2007,
            "items": [
                {
                    "title": "Pioneer to the Falls",
                    "order": 1,
                    "duration": "5:42",
                    "popularity": 78,
                    "reviews": [
                        {
                            "user": "user_7486",
                            "rating": 6,
                            "date": "03/10/2024",
                            "message": "Not as good as their earlier work, but still solid.",
                            "likes": 39
                        },
                        {
                            "user": "user_9219",
                            "rating": 8,
                            "date": "11/02/2024",
                            "message": "A beautiful blend of melody and melancholy.",
                            "likes": 74
                        },
                        {
                            "user": "user_7858",
                            "rating": 3,
                            "date": "09/18/2024",
                            "message": "",
                            "likes": 29
                        }
                    ]
                },
                {
                    "title": "No I in Threesome",
                    "order": 2,
                    "duration": "3:51",
                    "popularity": 80,
                    "reviews": [
                        {
                            "user": "user_5741",
                            "rating": 1,
                            "date": "08/13/2024",
                            "message": "Amazing production and atmospheric vibes.",
                            "likes": 40
                        },
                        {
                            "user": "user_3142",
                            "rating": 6,
                            "date": "11/09/2024",
                            "message": "Every track on this album is gold!",
                            "likes": 4
                        }
                    ]
                },
                {
                    "title": "The Scale",
                    "order": 3,
                    "duration": "3:24",
                    "popularity": 75,
                    "reviews": [
                        {
                            "user": "user_2620",
                            "rating": 3,
                            "date": "07/11/2024",
                            "message": "",
                            "likes": 2
                        }
                    ]
                },
                {
                    "title": "The Heinrich Maneuver",
                    "order": 4,
                    "duration": "3:28",
                    "popularity": 88,
                    "reviews": [
                        {
                            "user": "test2",
                            "rating": 8,
                            "date": "03/31/2024",
                            "message": "",
                            "likes": 12
                        },
                        {
                            "user": "user_9700",
                            "rating": 5,
                            "date": "02/27/2024",
                            "message": "",
                            "likes": 17
                        },
                        {
                            "user": "test2",
                            "rating": 10,
                            "date": "04/22/2024",
                            "message": "",
                            "likes": 94
                        }
                    ]
                },
                {
                    "title": "Mammoth",
                    "order": 5,
                    "duration": "4:12",
                    "popularity": 83,
                    "reviews": [
                        {
                            "user": "user_6290",
                            "rating": 1,
                            "date": "04/11/2024",
                            "message": "",
                            "likes": 47
                        },
                        {
                            "user": "user_1289",
                            "rating": 3,
                            "date": "11/03/2024",
                            "message": "",
                            "likes": 78
                        },
                        {
                            "user": "user_3591",
                            "rating": 5,
                            "date": "07/30/2024",
                            "message": "",
                            "likes": 72
                        }
                    ]
                },
                {
                    "title": "Pace Is the Trick",
                    "order": 6,
                    "duration": "4:36",
                    "popularity": 77,
                    "reviews": []
                },
                {
                    "title": "All Fired Up",
                    "order": 7,
                    "duration": "3:35",
                    "popularity": 74,
                    "reviews": [
                        {
                            "user": "user_8540",
                            "rating": 5,
                            "date": "03/09/2024",
                            "message": "",
                            "likes": 2
                        },
                        {
                            "user": "user_3391",
                            "rating": 6,
                            "date": "04/23/2024",
                            "message": "",
                            "likes": 30
                        }
                    ]
                },
                {
                    "title": "Rest My Chemistry",
                    "order": 8,
                    "duration": "5:00",
                    "popularity": 82,
                    "reviews": [
                        {
                            "user": "user_5583",
                            "rating": 7,
                            "date": "12/12/2024",
                            "message": "",
                            "likes": 48
                        }
                    ]
                },
                {
                    "title": "Who Do You Think",
                    "order": 9,
                    "duration": "3:12",
                    "popularity": 70,
                    "reviews": [
                        {
                            "user": "user_8641",
                            "rating": 10,
                            "date": "11/23/2024",
                            "message": "",
                            "likes": 24
                        }
                    ]
                },
                {
                    "title": "Wrecking Ball",
                    "order": 10,
                    "duration": "4:30",
                    "popularity": 73,
                    "reviews": [
                        {
                            "user": "user_2281",
                            "rating": 10,
                            "date": "03/15/2024",
                            "message": "I don't understand the hype, it's just okay.",
                            "likes": 12
                        },
                        {
                            "user": "user_8302",
                            "rating": 10,
                            "date": "09/10/2024",
                            "message": "",
                            "likes": 6
                        },
                        {
                            "user": "user_8191",
                            "rating": 1,
                            "date": "11/11/2024",
                            "message": "",
                            "likes": 25
                        },
                        {
                            "user": "user_9813",
                            "rating": 3,
                            "date": "11/22/2024",
                            "message": "The best record I've heard all year.",
                            "likes": 1
                        }
                    ]
                },
                {
                    "title": "Lighthouse",
                    "order": 11,
                    "duration": "5:25",
                    "popularity": 68,
                    "reviews": [
                        {
                            "user": "user_9415",
                            "rating": 4,
                            "date": "03/07/2024",
                            "message": "",
                            "likes": 6
                        },
                        {
                            "user": "user_7783",
                            "rating": 2,
                            "date": "09/12/2024",
                            "message": "Overrated in my opinion.",
                            "likes": 7
                        },
                        {
                            "user": "user_6858",
                            "rating": 8,
                            "date": "01/17/2025",
                            "message": "",
                            "likes": 22
                        }
                    ]
                }
            ],
            "reviews": [
                {
                    "user": "user_8292",
                    "rating": 1,
                    "date": "04/22/2024",
                    "message": "",
                    "likes": 18
                },
                {
                    "user": "test2",
                    "rating": 1,
                    "date": "05/24/2024",
                    "message": "",
                    "likes": 86
                },
                {
                    "user": "user_1619",
                    "rating": 7,
                    "date": "06/08/2024",
                    "message": "",
                    "likes": 7
                }
            ]
        }
    ]
};

export default function ArtistProfile({ artist = artistSample }) {
    const [expandedAlbum, setExpandedAlbum] = useState(null);
    const [activeItem, setActiveItem] = useState({ type: 'artist', data: artist });

    const handleClick = (type, data) => {
        if (type === 'artist') setExpandedAlbum(null);
        setActiveItem({ type, data });
    };

    return (
        <div className={styles['artist-profile']}>
            <div className="artist-data-container">
                <h1 className={ styles['artist-name'] +
                        (activeItem.type === 'artist' ? ' ' + styles['active'] : '')
                    }
                    onClick={() => handleClick('artist', artist)}
                >
                    {artist?.title}
                </h1>

                <div className={styles['album-list']}>
                    {artist.albums.map((album, index) => (
                        <div className={styles['album-container']}
                            key={index}
                        >
                            <div className={styles['album-row']}
                                onClick={() => {
                                    handleClick('album', album);
                                    setExpandedAlbum(index);  
                                }}
                            >
                                <h2 className={ styles['album-title'] + (
                                    activeItem.type === 'album' && activeItem.data === album ? 
                                        ' ' + styles['active']
                                        : ''
                                )}>
                                        {album.title}
                                </h2>
                                <p className={styles['album-year']}>{album.year}</p>
                            </div>

                            {expandedAlbum === index && (
                                <div className={styles['track-list']}>
                                    {album.items.map((track, trackIndex) => (
                                        <div className={styles['track-row']}
                                            key={trackIndex}
                                            onClick={() => handleClick('track', track)}
                                        >
                                            <span className={styles['track-order']}>
                                                {track.order}
                                            </span>
                                            <span className={styles['track-title'] + (         
                                                activeItem.type === 'track' &&
                                                activeItem.data === track ? 
                                                    ' ' + styles['active']
                                                    : ''
                                            )}>
                                                {track.title}
                                            </span>
                                            <span className={styles['track-duration']}>
                                                {track.duration}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>


            <div className={styles['motif-data-container']}>
                <div>
                    {activeItem.data.reviews.map((review, i) => (
                        <div key={i}>
                            {review.message}
                            {review.user}
                            {review.rating}
                            {review.date}
                            {review.likes}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
