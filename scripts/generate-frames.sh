#!/bin/bash

# Script to generate 30 frames from each video
# Requires: ffmpeg

PUBLIC_DIR="./public"
VIDEO_DIR="$PUBLIC_DIR/video"
FRAMES_DIR="$PUBLIC_DIR/frames"

# Create frames directories if they don't exist
mkdir -p "$FRAMES_DIR"

# Array of video files (without .mp4 extension)
videos=("signature" "softness" "prada" "grand" "classic" "hero")

for video in "${videos[@]}"; do
  echo "Generating 30 frames from $video.mp4..."

  # Create video-specific frames directory
  FRAME_DIR="$FRAMES_DIR/$video"
  mkdir -p "$FRAME_DIR"

  # Extract 30 frames from the video
  ffmpeg -i "$VIDEO_DIR/$video.mp4" \
    -vf "fps=5,scale=1920:1080:force_original_aspect_ratio=decrease" \
    -frames:v 30 \
    "$FRAME_DIR/frame-%04d.jpg" \
    -y 2>&1 | grep -E "frame=" | tail -1

  echo "✓ Generated 30 frames for $video"
done

echo "✓ All frames generated successfully!"
