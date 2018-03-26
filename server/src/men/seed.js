import mongoose from 'mongoose'
import auto from 'run-auto'

export default seed

function seed (self, cb) {
  if (self.settings.environment === 'production' || process.env.NODE_ENV === 'production') return cb()
  mongoose.connection.dropDatabase()
  const User = mongoose.model('users')
  const Blog = mongoose.model('blog')
  auto({
    remove (callback) {
      auto({
        User (callback) {
          User.find({}).remove().exec(() => {
            callback(null, true)
          })
        },
        Blog (callback) {
          Blog.find({}).remove().exec(() => {
            callback(null, true)
          })
        }
      },
      (error, results) => {
        if (error) throw error
        callback(null, true)
      })
    },
    users: ['remove', (done, callback) => {
      User.create({
        email: 'jason@greenpioneersolutions.com',
        password: 'truetrue1!',
        roles: ['admin'],
        profile: {
          name: 'jason greenpioneer'
        }
      }, {
        email: 'accounting@greenpioneersolutions.com',
        password: 'truetrue1!',
        profile: {
          name: 'accounting greenpioneer'
        }
      }, {
        email: 'ceo@greenpioneersolutions.com',
        password: 'truetrue1!',
        profile: {
          name: 'ceo greenpioneer'
        }
      }, {
        email: 'development@greenpioneersolutions.com',
        password: 'truetrue1!',
        profile: {
          name: 'development greenpioneer'
        }
      }, {
        email: 'qa@greenpioneersolutions.com',
        password: 'truetrue1!',
        profile: {
          name: 'qa greenpioneer'
        }
      }, {
        email: 'help@greenpioneersolutions.com',
        password: 'truetrue1!',
        profile: {
          name: 'help greenpioneer'
        }
      }).then(users => {
        callback(null, users)
      })
    }],
    blogs: ['users', (results, callback) => {
      Blog.create({
        title: 'Mean',
        content: 'Mongo Express Angular Node',
        user: results.users[0]._id

      }, {
        title: 'Green Pioneer Solutions',
        content: 'Welcome to Green Pioneer Solutions, a green computing pioneer in the computer, web development, and web technology fields.',
        user: results.users[0]._id

      }, {
        title: 'expertise',
        content: 'Our expertise lies in pioneering efficient computing and programming methods, which in turn translates to real-world solutions for major concerns such as using too many servers with too much electricity.',
        user: results.users[1]._id

      }, {
        title: 'combination',
        content: 'With this combination of green computing and expert programming knowledge, we have top coders who take their love for computing and coding and share it with others.',
        user: results.users[2]._id

      }, {
        title: 'goals',
        content: 'Our goals include reducing the use of hazardous or unnecessary materials, maximizing energy efficiency during a product’s lifetime, and increasing the lifetime of products with the use of green computing solutions.',
        user: results.users[2]._id

      }, {
        title: 'energy-efficient',
        content: 'We make using computers as energy-efficient as possible by designing algorithms and systems for efficient computer technologies. We are pioneers in the field of green computing.',
        user: results.users[3]._id

      }, {
        title: 'vision',
        content: 'We believe in the vision of sustainable computing. We stand out from the crowd because our focus is on green computing – a concept that many companies and organizations do not pay enough attention to.',
        user: results.users[4]._id

      }, {
        title: 'sustainability',
        content: 'Our focus on sustainability allows us to do things differently and more effectively, whether that be through solving logistical problems or developing and selling web technology.',
        user: results.users[4]._id

      }, {
        title: 'Sustainable',
        content: 'Sustainable or green computing involves the best-known practices of designing, manufacturing, using, and disposing of anything from computers to servers and even subsystems.',
        user: results.users[5]._id

      }, {
        title: 'computing',
        content: 'With a green computing mission in mind, Green Pioneer Solutions will implement practices and equipment that can reduce the environmental impact of systems, software, and hardware.',
        user: results.users[5]._id

      }, {
        title: 'example',
        content: 'For example, when Green Pioneer Solutions writes code for a software, we consider the environmental impact of superfluous code which will in turn increase battery drain and require more energy to maintain.',
        user: results.users[5]._id

      }).then(blogs => {
        callback(null, blogs)
      })
    }]
  }, (error, results) => {
    if (error) throw error
    cb(results)
  })
}