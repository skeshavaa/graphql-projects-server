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
        image: {type: GraphQLList},
        stack: {type: GraphQLList},
        code: {type: GraphQLString},
        demo: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    project: {
        type: ProjectType
    }
})

module.exports = new GraphQLSchema({

});