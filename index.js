import './db/mongo.js'

import Nota from "./models/Note.js"

import { ApolloServer, gql } from "apollo-server";
import { v1 as uuid} from "uuid"


const typeDefs = gql`
    type Note {
        id: ID!
        content: String!
        date: String!
        important: Boolean
    }

    type Query {
        notesCount : Int!
        allNotes: [Note]!
        findNoteById(id: ID!): Note
    }

    type Mutation {
        addNote(
            content: String!
            important: Boolean
        ): Note
        editNote(
            id: ID!
            content: String
            important: Boolean
        ): Note
    }
`

const resolvers = {
    Query: {
        notesCount : () => Nota.collection.countDocuments(),

        allNotes : async (root,args) => { return Nota.find({}) },

        findNoteById : async (root,args) =>{ return Nota.findById({_id: args.id}) } 
    },
    Mutation: {
        addNote: (root, args) => {

            const nota = new Nota({...args})
            nota.date = new Date()
            nota.id = uuid()
            return nota.save()
        },
        editNote : async (root,args) => {
            return Nota.findByIdAndUpdate({_id: args.id},{...args},{new: true})
        }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then( ({url})=>{
    console.log(`Apollo Server running at Port ${url}`)
})