
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from basic_pitch.inference import predict
import os
import tempfile
import io

app = Flask(__name__)
CORS(app)

@app.route('/convert', methods=['POST'])
def convert_audio():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    # Save uploaded file to temporary location
    temp_dir = tempfile.mkdtemp()
    audio_path = os.path.join(temp_dir, 'input.wav')
    file.save(audio_path)
    
    try:
        # Process with Basic Pitch
        model_output = predict(audio_path)
        
        # Save MIDI file
        midi_path = os.path.join(temp_dir, 'output.mid')
        model_output.midi.write(midi_path)
        
        # Return MIDI file
        with open(midi_path, 'rb') as f:
            midi_data = f.read()
        
        return send_file(
            io.BytesIO(midi_data),
            mimetype='audio/midi',
            as_attachment=True,
            download_name='converted.mid'
        )
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Cleanup temporary files
        if os.path.exists(audio_path):
            os.remove(audio_path)
        if os.path.exists(midi_path):
            os.remove(midi_path)

if __name__ == '__main__':
    app.run(port=5000)
