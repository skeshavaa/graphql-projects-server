const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// const projects = [
//     {id: "1", title: "project1", desc: "desc for project1", image: ["fake image url"], stack: ['react', 'gatsby'],  code: "fake code url", project: "fake demo url"},
//     {id: "2", title: "project2", desc: "desc for project2", image: ["fake image url"], stack: ['flutter', 'express'],  code: "fake code url", project: "fake demo url"},
//     {id: "3", title: "project3", desc: "desc for project3", image: ["fake image url"], stack: ['mongodb', 'firebase'],  code: "fake code url", project: "fake demo url"}
// ];

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
        project: {
            type: ProjectType,
            args:{
                id:{type: GraphQLString}
            },
            resolve(parentValue, args){
                // for (let i = 0; i < projects.length; i++){
                //     if (projects[i].id == args.id){
                //         return projects[i];
                //     }
                // }
                return axios.get('http://localhost:3000/projects/' + args.id)
                    .then(res => res.data);

            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/projects')
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