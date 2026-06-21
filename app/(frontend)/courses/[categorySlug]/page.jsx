import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';
import CategoryViewClient from '../../components/CategoryViewClient';

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise });
    const categories = await payload.find({
        collection: 'categories',
        limit: 100,
        select: { slug: true }
    });
    
    return categories.docs.map((category) => ({
        categorySlug: category.slug,
    }));
}

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
        alternates: {
            canonical: `https://www.martialartsschool.in/courses/${categorySlug}`,
        },
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

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": courses.map((course, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "url": `https://www.martialartsschool.in/courses/${categorySlug}/${course.slug}`
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CategoryViewClient category={category} courses={courses} />
        </>
    );
}
