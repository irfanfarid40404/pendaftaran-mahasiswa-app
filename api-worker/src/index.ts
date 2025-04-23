import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

const MahasiswaSchema = z.object({
  nim: z.string().min(5),
  nama: z.string().min(3),
  fakultas: z.string().min(3),
  jurusan: z.string().min(3),
  angkatan: z.number().int().min(2000).max(2099),
  email: z.string().email(),
  no_hp: z.string().min(10),
  alamat: z.string().optional(),
})

// Create table migration
app.post('/migrate', async (c) => {
  try {
    await c.env.DB.exec(`
      CREATE TABLE IF NOT EXISTS mahasiswa (
        id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
        nim TEXT NOT NULL UNIQUE,
        nama TEXT NOT NULL,
        fakultas TEXT NOT NULL,
        jurusan TEXT NOT NULL,
        angkatan INTEGER NOT NULL,
        email TEXT NOT NULL,
        no_hp TEXT NOT NULL,
        alamat TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `)
    return c.json({ message: 'Migration completed' })
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

// Get all mahasiswa
app.get('/mahasiswa', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      `
      SELECT * FROM mahasiswa ORDER BY created_at DESC
    `,
    ).all()
    return c.json(results)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

// Get single mahasiswa
app.get('/mahasiswa/:id', async (c) => {
  const id = c.req.param('id')
  try {
    const result = await c.env.DB.prepare(
      `
      SELECT * FROM mahasiswa WHERE id = ?
    `,
    )
      .bind(id)
      .first()

    if (!result) {
      return c.json({ error: 'Mahasiswa not found' }, 404)
    }

    return c.json(result)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

// Create mahasiswa
app.post('/mahasiswa', zValidator('json', MahasiswaSchema), async (c) => {
  const data = c.req.valid('json')

  try {
    const result = await c.env.DB.prepare(
      `
      INSERT INTO mahasiswa (nim, nama, fakultas, jurusan, angkatan, email, no_hp, alamat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `,
    )
      .bind(
        data.nim,
        data.nama,
        data.fakultas,
        data.jurusan,
        data.angkatan,
        data.email,
        data.no_hp,
        data.alamat || null,
      )
      .first()

    return c.json(result, 201)
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return c.json({ error: 'NIM already exists' }, 400)
    }
    return c.json({ error: err.message }, 500)
  }
})

// Update mahasiswa
app.put('/mahasiswa/:id', zValidator('json', MahasiswaSchema.partial()), async (c) => {
  const id = c.req.param('id')
  const data = c.req.valid('json')

  try {
    const fields = []
    const values = []

    if (data.nim) {
      fields.push('nim = ?')
      values.push(data.nim)
    }
    if (data.nama) {
      fields.push('nama = ?')
      values.push(data.nama)
    }
    if (data.fakultas) {
      fields.push('fakultas = ?')
      values.push(data.fakultas)
    }
    if (data.jurusan) {
      fields.push('jurusan = ?')
      values.push(data.jurusan)
    }
    if (data.angkatan) {
      fields.push('angkatan = ?')
      values.push(data.angkatan)
    }
    if (data.email) {
      fields.push('email = ?')
      values.push(data.email)
    }
    if (data.no_hp) {
      fields.push('no_hp = ?')
      values.push(data.no_hp)
    }
    if (data.alamat !== undefined) {
      fields.push('alamat = ?')
      values.push(data.alamat)
    }

    if (fields.length === 0) {
      return c.json({ error: 'No fields to update' }, 400)
    }

    fields.push('updated_at = datetime("now")')

    const query = `
      UPDATE mahasiswa
      SET ${fields.join(', ')}
      WHERE id = ?
      RETURNING *
    `

    const result = await c.env.DB.prepare(query)
      .bind(...values, id)
      .first()

    if (!result) {
      return c.json({ error: 'Mahasiswa not found' }, 404)
    }

    return c.json(result)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

// Delete mahasiswa
app.delete('/mahasiswa/:id', async (c) => {
  const id = c.req.param('id')

  try {
    const result = await c.env.DB.prepare(
      `
      DELETE FROM mahasiswa
      WHERE id = ?
      RETURNING id
    `,
    )
      .bind(id)
      .first()

    if (!result) {
      return c.json({ error: 'Mahasiswa not found' }, 404)
    }

    return c.json({ message: 'Mahasiswa deleted successfully' })
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

export default app
