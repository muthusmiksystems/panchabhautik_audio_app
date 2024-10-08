interface AudioFiles {
  [key: string]: { [fileName: string]: any };
}
const audioFilesMap: AudioFiles = {
  Prithvi: {
    'Prithvi 1.mp4': { path: require('../assets/audio/Prithvi/Prithvi.mp4'), value: 'Prithvi.mp4' ,name:'../assets/audio/Prithvi/Prithvi.mp4'},
    'Prithvi 2.mp4': { path: require('../assets/audio/Prithvi/Prithvi_2.mp4'), value: 'Prithvi_2.mp4' ,name:'../assets/audio/Prithvi/Prithvi_2.mp4'},
    
  },
  Jal: {
    'Jal.mp4': { path: require('../assets/audio/Jal/Jal.mp4'), value: 'Jal.mp4' ,name:'../assets/audio/Jal/Jal.mp4'},
  },
  Akash: {
    'Akash.mp4': { path: require('../assets/audio/Akash/Akash.mp4'), value: 'Akash.mp4',name: '../assets/audio/Akash/Akash.mp4'},
    
  },
  Tej: {
    'Tej.mp4': { path: require('../assets/audio/Tej/Tej.mp4'), value: 'Tej.mp4',name:'../assets/audio/Tej/Tej.mp4' },
  },
};


export default audioFilesMap;
