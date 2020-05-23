const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// Project Data Type, you can modify this for your needs, 
// or create a new file to add another schema as well
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type:GraphQLString},
        title: {type: GraphQLString},
        desc: {type: GraphQLString},
        image: {type: GraphQLList(GraphQLString)},
        stack: {type: GraphQLList(GraphQLString)},
        code: {type: GraphQLString},
        demo: {type: GraphQLString}
    })
})

// You can query projects by their id or
// you can just query all the projects together
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //Query for a specific project by ID
        project: {
            type: ProjectType,
            args:{
                id:{type: GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/projects/' + args.id)
                    .then(res => res.data);

            }
        },
        //Query for all projects
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/projects')
                    .then(res => res.data)
            }
        },
    }
})

// Mutations to add, delete or update
// an entry in the json server
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject:{
            type:ProjectType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                desc: {type: new GraphQLNonNull(GraphQLString)},
                image: {type: new GraphQLNonNull(GraphQLList(GraphQLString))},
                stack: {type: new GraphQLNonNull(GraphQLList(GraphQLString))},
                code: {type: new GraphQLNonNull(GraphQLString)},
                demo: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/projects', {
                    id: args.id,
                    title: args.title,
                    desc: args.desc,
                    image: args.image,
                    stack: args.stack,
                    code: args.code,
                    demo: args.demo
                })
                .then(res => res.data);
            }
        },



        deleteProject:{
            type:ProjectType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/projects/' + args.id)
                    .then(res => res.data);
            }
        },


        editProject:{
            type:ProjectType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)},
                title: {type: (GraphQLString)},
                desc: {type: (GraphQLString)},
                image: {type: (GraphQLList(GraphQLString))},
                stack: {type: (GraphQLList(GraphQLString))},
                code: {type: (GraphQLString)},
                demo: {type: (GraphQLString)},
            },
            resolve(parentValue, args){
                return axios.patch('http://localhost:3000/projects/' + args.id, args)
                .then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});