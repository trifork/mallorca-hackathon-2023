from mutagen.mp3 import MP3
import sys

if __name__ == '__main__':
    
    filepath = sys.argv[1]
    audio = MP3(filepath)

    print(audio.info.length * 1000)