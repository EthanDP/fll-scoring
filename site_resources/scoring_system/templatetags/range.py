from django import template

register = template.Library()

@register.filter()
def range(min):
    return "0" * min