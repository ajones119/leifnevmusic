# Run from the repository root. Preserve the transparent original and 98-frame cut.
# Explicit libvpx decoding is required to retain the WebM alpha before compositing.
$ErrorActionPreference = 'Stop'
ffmpeg -hide_banner -loglevel error -nostdin -n `
  -f lavfi -i 'color=c=0xf0e9dc:s=640x640:r=24,format=rgba' `
  -c:v libvpx-vp9 -i public/media/scissortail-loop.webm `
  -filter_complex '[0:v][1:v]overlay=shortest=1:format=rgb,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[out]' `
  -map '[out]' -map_metadata -1 -an -c:v libx264 -crf 18 -preset slow `
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 `
  -movflags +faststart public/media/scissortail-loop-cream.mp4
if ($LASTEXITCODE -ne 0) { throw 'Scissortail encode failed.' }
