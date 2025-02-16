# Audio Assets Directory

This directory contains audio assets used throughout the Nookpedia Companion application.

## Directory Structure

```
/audio
  /background
    /hourly         # Hour-long background music tracks
    /ambient        # Shorter background loops
  /effects          # Sound effects and jingles
  /ambient          # Ambient nature sounds
```

## Usage Guidelines

1. Background Music
   - Hourly tracks (1-hour duration)
     - Toggleable via global audio settings
     - Recommended format: .mp3 or .ogg
     - Target bitrate: 128-192 kbps
     - Progressive loading support
   - Shorter background loops
     - Loopable tracks for different sections
     - Recommended format: .mp3 or .ogg
     - Target file size: < 2MB per track

2. Sound Effects
   - Short audio clips for UI interactions
   - Recommended format: .mp3 or .wav
   - Target file size: < 100KB per effect

3. Ambient Sounds
   - Environmental sounds for immersion
   - Recommended format: .mp3 or .ogg
   - Target file size: < 1MB per track

## Implementation Notes

- All audio files should be optimized for web playback
- Include both day and night variations for background music
- Maintain consistent volume levels across all audio files
- Consider providing lower quality fallbacks for slower connections
- Hour-long background tracks can be globally toggled on/off
- Implement progressive loading for hour-long tracks to optimize initial load time
- Cache hour-long tracks locally when possible to reduce bandwidth usage