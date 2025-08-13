'use client'

import { useState } from 'react'

export default function Space() {
  const [tab, setTab] = useState<'projets' | 'evenements'>('projets')

  return (
    <div className="w-full h-full text-white">
      {/* Onglets */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab('projets')}
          className={`px-4 py-2 rounded-full font-semibold ${tab === 'projets' ? 'bg-white text-black' : 'bg-white/10'}`}
        >
          Ajouter un projet
        </button>
        <button
          onClick={() => setTab('evenements')}
          className={`px-4 py-2 rounded-full font-semibold ${tab === 'evenements' ? 'bg-white text-black' : 'bg-white/10'}`}
        >
          Ajouter un événement
        </button>
      </div>

      {/* Formulaire projet */}
      {tab === 'projets' && <FormProjet />}

      {/* Formulaire événement */}
      {tab === 'evenements' && <FormEvenement />}
    </div>
  )
}

function FormProjet() {
  const [form, setForm] = useState({
    nom: '',
    description: '',
    lien: '',
    team: false,
    type: 'dev',
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setForm(prev => ({ ...prev, [name]: checked }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setSelectedFile(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('nom', form.nom)
    formData.append('description', form.description)
    formData.append('lien', form.lien)
    formData.append('team', form.team ? 'true' : 'false')
    formData.append('type', form.type)

    if (selectedFile) {
      formData.append('image', selectedFile)
    }

    try {
      const res = await fetch('/api/admin/projet', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Erreur lors de l’ajout')
      alert('Projet ajouté !')
      setForm({ nom: '', description: '', lien: '', team: false, type: 'dev' })
      setSelectedFile(null)
    } catch (err) {
      console.error(err)
      alert("Échec de l'ajout")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input type="text" name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" className="inputStyle" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="inputStyle" required />
      
      {/* ✅ Champ pour l’URL du projet */}
      <input type="text" name="lien" value={form.lien} onChange={handleChange} placeholder="Lien (optionnel)" className="inputStyle" />

      {/* ✅ Champ pour uploader une image */}
      <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="inputStyle" />

      <div className="flex items-center gap-2">
        <input type="checkbox" name="team" checked={form.team} onChange={handleChange} />
        <label>Projet en équipe</label>
      </div>

      <select name="type" value={form.type} onChange={handleChange} className="inputStyle">
        <option value="dev">Développement</option>
        <option value="crea">Création</option>
        <option value="com">Communication</option>
      </select>

      <button type="submit" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200">Ajouter projet</button>
    </form>
  )
}

function FormEvenement() {
  const [form, setForm] = useState({
    titre: '',
    date: '',
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/evenement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Erreur lors de l’ajout')
      alert('Événement ajouté !')
      setForm({ titre: '', date: '', description: '' })
    } catch (err) {
      console.error(err)
      alert("Échec de l'ajout")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input type="text" name="titre" value={form.titre} onChange={handleChange} placeholder="Titre" className="inputStyle" required />
      <input type="date" name="date" value={form.date} onChange={handleChange} className="inputStyle" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="inputStyle" required />
      <button type="submit" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200">Ajouter événement</button>
    </form>
  )
}
