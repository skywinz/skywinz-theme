import {DataTypes, Sequelize, Model} from 'sequelize';
import {SQLITE_ROOT} from '../../constants/server';


const timeStampSnakeCase = {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
}

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: SQLITE_ROOT,
});

export interface PostSeriesAttributes {
    name: string;
    summary: string;
    imageUrl?: string;
}

export interface PostTagAttributes {
    id?: number;
    name: string;
    postPk?: number;
}

export interface PostAttributes {
    pk: number;
    id: string;
    title: string;
    imageUrl?: string;
    publicDate: Date;
    summary?: string;
    seriesName?: string;
    postTags?: Model<PostTagAttributes>[]
}

export const Post = sequelize.define<Model<PostAttributes>, PostAttributes>('post', {
    pk: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id: {
        comment: '포스트 고유 아이디',
        type: DataTypes.STRING(64),
        unique: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    imageUrl: {
        field: 'image_url',
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    publicDate: {
        field: 'public_date',
        type: DataTypes.DATE,
        allowNull: false,
    },
    summary: {
        type: DataTypes.STRING(512),
        allowNull: true,
    },
}, {
    ...timeStampSnakeCase
});

export const PostSeries = sequelize.define<Model<PostSeriesAttributes>, PostSeriesAttributes>('post_series', {
    name: {
        type: DataTypes.STRING(32),
        primaryKey: true,
    },
    summary: {
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    imageUrl: {
        field: 'image_url',
        type: DataTypes.STRING(256),
        allowNull: true,
    }
});


export const PostTag = sequelize.define<Model<PostTagAttributes>, PostTagAttributes>('post_tag', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
    }
});

PostSeries.hasMany(Post, {
    foreignKey: {
        name: 'seriesName',
        field: 'series_name',
    },
});
Post.belongsTo(PostSeries);

Post.hasMany(PostTag, {
    foreignKey: {
        name: 'postPk',
        field: 'post_pk',
    },
    as: 'postTags',
});
PostTag.belongsTo(Post);