export const dynamic = 'force-dynamic';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';
import CategoryViewClient from '../../components/CategoryViewClient';

export async function generateMetadata({ params }) {
    const payload = await getPayload({ config: configPromise });
    const { categorySlug } = await params;
    
    const categoriesRes = await payload.find({
        collection: 'categories',
        where: {
            slug: {
                equals: categorySlug,
            },
        },
    });

    const category = categoriesRes.docs[0];

    return {
        title: category ? `${category.title} | LHBS` : 'Programs | LHBS',
        description: `Explore all courses in our ${category?.title || 'Program'}.`,
    };
}

export default async function CategoryPage({ params }) {
    const payload = await getPayload({ config: configPromise });
    const { categorySlug } = await params;

    // Fetch the category
    const categoriesRes = await payload.find({
        collection: 'categories',
        where: {
            slug: {
                equals: categorySlug,
            },
        },
    });

    const category = categoriesRes.docs[0];

    if (!category) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center text-text">
                <h1 className="text-3xl font-bold">Category Not Found</h1>
            </div>
        );
    }

    // Fetch courses for this category
    const coursesRes = await payload.find({
        collection: 'coursenames',
        where: {
            category: {
                equals: category.id,
            },
        },
        limit: 100,
        depth: 1,
    });

    const courses = coursesRes.docs;

    return (
        <CategoryViewClient category={category} courses={courses} />
    );
}
