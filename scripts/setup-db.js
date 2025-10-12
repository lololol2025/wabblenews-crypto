#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function setupDatabase() {
  try {
    console.log('🚀 Setting up WabbleNews database...')
    
    // Check if admin exists
    const adminCount = await prisma.admin.count()
    
    if (adminCount === 0) {
      console.log('👤 Creating admin account...')
      
      const email = process.env.ADMIN_EMAIL || 'admin@wabblenews.com'
      const password = process.env.ADMIN_PASSWORD || 'Admin123!@#'
      
      const hashedPassword = await bcrypt.hash(password, 12)
      
      const admin = await prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
          name: 'Admin',
        },
      })
      
      console.log(`✅ Admin created: ${admin.email}`)
    } else {
      console.log('✅ Admin already exists')
    }
    
    console.log('🎉 Database setup complete!')
  } catch (error) {
    console.error('❌ Setup error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase()
