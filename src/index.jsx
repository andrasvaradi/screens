import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

const imageUrl = id =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;

const videoUrl = id =>
  `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${id}.mp4`;
const images = [
  // Back
  {
    position: [-0.8, 0, -0.6],
    rotation: [0, 0, 0],
    imageUrl: imageUrl(310452),
    url: videoUrl('ElephantsDream'),
  },
  {
    position: [0.8, 0, -0.6],
    rotation: [0, 0, 0],
    imageUrl: imageUrl(310452),
    url: videoUrl('BigBuckBunny'),
  },
  // Left
  {
    position: [-1.75, 0, 0.25],
    rotation: [0, Math.PI / 2.5, 0],
    imageUrl: imageUrl(310452),
    url: videoUrl('Sintel'),
  },
  {
    position: [-2.15, 0, 2],
    rotation: [0, Math.PI / 2.5, 0],
    imageUrl: imageUrl(310452),
    url: videoUrl('SubaruOutbackOnStreetAndDirt'),
  },
  // Right
  {
    position: [1.75, 0, 0.25],
    rotation: [0, -Math.PI / 2.5, 0],
    imageUrl: imageUrl(310452),
    url: videoUrl('TearsOfSteel'),
  },
  {
    position: [2.15, 0, 2],
    rotation: [0, -Math.PI / 2.5, 0],
    imageUrl: imageUrl(310452),
    url: videoUrl('ForBiggerEscapes'),
  },
];

createRoot(document.getElementById('root')).render(<App images={images} />);
