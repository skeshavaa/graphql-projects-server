const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

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

        //Query project by Tech Stack
        projectByTech: {
            type: ProjectType,
            args: {
                title: {type: GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/projects/' + args.title)
                    .then(res => res.data)
            }
        }
    }
})

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