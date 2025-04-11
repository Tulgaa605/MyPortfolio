import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '@/lib/auth';

// Define the context type explicitly
type BlogRouteContext = { params: { id: string } };

// Define the handler type
type BlogRouteHandler = (
  request: NextRequest,
  context: BlogRouteContext
) => Promise<Response | NextResponse>;

// GET a single blog by ID
export const GET: BlogRouteHandler = async (request, context) => {
  // Restore original GET handler logic
  try {
    const { id } = context.params;
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
};

// PUT (update) a blog
export const PUT: BlogRouteHandler = async (request, context) => {
  try {
    // Check authentication
    const authResult = await authMiddleware(request);
    // If authMiddleware returns a response with an error status, return it immediately
    if (authResult.status >= 400) {
      return authResult;
    }

    const { id } = context.params;
    const body = await request.json();
    const { title, content, slug, image, published } = body;

    // Validate required fields
    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Title, content, and slug are required' },
        { status: 400 }
      );
    }

    // Update the blog
    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        slug,
        image: image || null,
        published: published || false,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
};

// DELETE a blog
export const DELETE: BlogRouteHandler = async (request, context) => {
  try {
    // Check authentication
    const authResult = await authMiddleware(request);
    // If authMiddleware returns a response with an error status, return it immediately
    if (authResult.status >= 400) {
      return authResult;
    }

    const { id } = context.params;

    // Delete the blog
    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Blog deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}; 