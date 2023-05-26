AUDIO_OUTPUT_DIR=public_html/audio
TRACK_1=$(AUDIO_OUTPUT_DIR)/medicina-dramatica-demo-track.mp3
TRACK_2=$(AUDIO_OUTPUT_DIR)/hazy-lofi-demo-track.mp3
TRACK_3=$(AUDIO_OUTPUT_DIR)/cinetronica-demo-track.mp3

all: $(TRACK_1) $(TRACK_2) $(TRACK_3)

$(AUDIO_OUTPUT_DIR):
	mkdir -p $(AUDIO_OUTPUT_DIR)

$(TRACK_1): $(AUDIO_OUTPUT_DIR)
	curl https://d3l7thry0a8a7p.cloudfront.net/audio/a36a53a5-ab7b-4ec5-a6b5-72cc7719cee4/Medicina+Dramatica/Medicina+Dramatica+Demo+Track.wav | lame -b 256 - $(TRACK_1)

$(TRACK_2): $(AUDIO_OUTPUT_DIR)
	curl https://d3l7thry0a8a7p.cloudfront.net/audio/2c83841d-dd78-4c2e-8317-6297ace89aae/Hazy+Lofi/Hazy+Lofi+Demo+Track.wav | lame -b 256 - $(TRACK_2)

$(TRACK_3): $(AUDIO_OUTPUT_DIR)
	curl https://d3l7thry0a8a7p.cloudfront.net/audio/ded5a2b6-5be5-462a-b193-73306ca5c749/Venus+Theory+-+Cinetronica/Cinetronica+Demo+Track.wav | lame -b 256 - $(TRACK_3)
