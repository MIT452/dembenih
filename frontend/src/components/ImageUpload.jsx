import React, { useState } from 'react';
import axios from 'axios';
import { Image, Loader2, Upload, X } from 'lucide-react';

const ImageUpload = ({ onUploadSuccess, currentImage, label = "Télécharger une image" }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview locally
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload to server
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:4000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            
            // Success
            const imageUrl = `http://localhost:4000${res.data.data}`;
            onUploadSuccess(imageUrl);
        } catch (err) {
            console.error('Erreur upload', err);
            alert('Erreur lors du téléchargement de l\'image');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="image-upload-container" style={{ margin: '15px 0' }}>
            <label className="auth-input-label">{label}</label>
            <div className="image-upload-wrapper" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px',
                padding: '10px',
                border: '1px dashed #cbd5e1',
                borderRadius: '12px',
                background: '#f8fafc'
            }}>
                <div className="image-preview" style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    background: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}>
                    {preview ? (
                        <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <Image size={24} style={{ color: '#94a3b8' }} />
                    )}
                </div>
                
                <div style={{ flex: 1 }}>
                    {uploading ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem' }}>
                            <Loader2 size={16} className="h-spin" />
                            Téléchargement...
                        </div>
                    ) : (
                        <label style={{ 
                            cursor: 'pointer', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            color: '#10b981', 
                            fontSize: '0.85rem',
                            fontWeight: 700
                        }}>
                            <Upload size={16} />
                            {preview ? 'Changer l\'image' : 'Choisir un fichier'}
                            <input type="file" onChange={handleFileChange} hidden accept="image/*" />
                        </label>
                    )}
                </div>

                {preview && !uploading && (
                    <button 
                        type="button" 
                        onClick={() => { setPreview(null); onUploadSuccess(''); }}
                        style={{ border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer' }}
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
