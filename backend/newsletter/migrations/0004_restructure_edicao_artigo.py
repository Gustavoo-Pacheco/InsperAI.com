from django.db import migrations, models


def drop_existing_rows(apps, schema_editor):
    Artigo = apps.get_model('newsletter', 'Artigo')
    Edicao = apps.get_model('newsletter', 'Edicao')
    Artigo.objects.all().delete()
    Edicao.objects.all().delete()


def noop(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('newsletter', '0003_inscricao_unique_inscricao_email_setor'),
    ]

    operations = [
        migrations.RunPython(drop_existing_rows, reverse_code=noop),

        # Edicao: drop old constraint and old fields
        migrations.RemoveConstraint(
            model_name='edicao',
            name='unique_edicao_numero_mes_ano',
        ),
        migrations.RemoveField(model_name='edicao', name='numero'),
        migrations.RemoveField(model_name='edicao', name='mes'),
        migrations.RemoveField(model_name='edicao', name='ano'),

        # Edicao: add new fields (table is empty so no default needed)
        migrations.AddField(
            model_name='edicao',
            name='week_id',
            field=models.CharField(default='', help_text='ISO week id, e.g. 2026-W18', max_length=8),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='edicao',
            name='segment',
            field=models.CharField(
                choices=[('engenharia', 'Engenharia'), ('direito', 'Direito'), ('financas', 'Finanças')],
                default='engenharia',
                max_length=20,
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='edicao',
            name='date',
            field=models.DateField(default='2026-01-01'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='edicao',
            name='title',
            field=models.CharField(default='', max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='edicao',
            name='description',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AlterModelOptions(
            name='edicao',
            options={'ordering': ['-date', 'segment']},
        ),
        migrations.AddConstraint(
            model_name='edicao',
            constraint=models.UniqueConstraint(
                fields=('week_id', 'segment'),
                name='unique_edicao_week_segment',
            ),
        ),

        # Artigo: drop setor, rename url -> link (via remove + add since table is empty), expand fields
        migrations.RemoveField(model_name='artigo', name='setor'),
        migrations.RemoveField(model_name='artigo', name='url'),
        migrations.AddField(
            model_name='artigo',
            name='link',
            field=models.URLField(default='', max_length=500),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='artigo',
            name='importancia',
            field=models.PositiveSmallIntegerField(default=5, help_text='1-10'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='artigo',
            name='por_que_importa',
            field=models.TextField(blank=True, default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='artigo',
            name='tema',
            field=models.CharField(blank=True, default='', max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='artigo',
            name='empresas',
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name='artigo',
            name='explicacao_jargao',
            field=models.TextField(blank=True, default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='artigo',
            name='ordem',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='artigo',
            name='destaque',
            field=models.BooleanField(default=False, help_text='Featured article in this edition'),
        ),
        migrations.AlterModelOptions(
            name='artigo',
            options={'ordering': ['-destaque', '-importancia', 'ordem']},
        ),
    ]
