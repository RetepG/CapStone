from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text

def seed_items():
    item_1 = Item(
        user_id=1,
        name='Custom Cat Portrait',
        price=100.00,
        description='Best cat photos arounc, nothing can compete.',
        mainimage='https://i.etsystatic.com/23091542/r/il/59f313/3912729232/il_794xN.3912729232_4269.jpg',
        sideimage='https://i.etsystatic.com/23091542/r/il/2f53b9/3960230277/il_794xN.3960230277_stsb.jpg',
        sideimage2='https://i.etsystatic.com/23091542/r/il/8a16fc/3912729040/il_794xN.3912729040_gjsl.jpg',
        sideimage3='https://i.etsystatic.com/23091542/r/il/83644a/3960230243/il_794xN.3960230243_n5f3.jpg'
    )

    item_2 = Item(
        user_id=1,
        name='Custom Cat, Dog Portraits',
        price=200.00,
        description='Can create custom pet photos cheap and fast.',
        mainimage='https://i.etsystatic.com/37224231/r/il/3e959f/4146868188/il_794xN.4146868188_gy4n.jpg',
        sideimage='https://i.etsystatic.com/37224231/r/il/5ad971/4454773094/il_794xN.4454773094_fwag.jpg',
        sideimage2='https://i.etsystatic.com/37224231/r/il/43cbc2/4502127017/il_794xN.4502127017_s9a0.jpg',
        sideimage3='https://i.etsystatic.com/37224231/r/il/f66d7e/4502127281/il_794xN.4502127281_kjob.jpg'
    )

    item_3 = Item(
        user_id=1,
        name='Cat and Dog Collar Tags',
        price=25.00,
        description='Never forget your pets name again! Identity crisis avoided.',
        mainimage='https://i.etsystatic.com/35713473/r/il/a6f3b1/3931627277/il_794xN.3931627277_tmkc.jpg',
        sideimage='https://i.etsystatic.com/35713473/r/il/63602e/3884141524/il_794xN.3884141524_r6pe.jpg',
        sideimage2='https://i.etsystatic.com/35713473/r/il/459e23/3931626259/il_794xN.3931626259_sr0f.jpg',
        sideimage3='https://i.etsystatic.com/35713473/r/il/11ec4d/3884140894/il_794xN.3884140894_knvj.jpg'
    )

    item_4 = Item(
        user_id=1,
        name='Cartoon pet illustration',
        price=120.00,
        description='Original pet illustrations, no better price around!',
        mainimage='https://i.etsystatic.com/40833078/r/il/ba0424/4937200158/il_794xN.4937200158_dkdn.jpg',
        sideimage='https://i.etsystatic.com/40833078/r/il/89e7d0/4943851317/il_794xN.4943851317_nd9r.jpg',
        sideimage2='https://i.etsystatic.com/40833078/r/il/750b6e/4943849539/il_794xN.4943849539_sxf4.jpg',
        sideimage3='https://i.etsystatic.com/40833078/r/il/007008/4943875163/il_794xN.4943875163_sxfr.jpg'
    )

    item_5 = Item(
        user_id=1,
        name='Hand Carved Cat Figures',
        price=40.00,
        description='Well crafted, hand made cat figures with crazy detail and realism.',
        mainimage='https://i.etsystatic.com/18840488/r/il/27b9cb/4974218686/il_794xN.4974218686_nfbu.jpg',
        sideimage='https://i.etsystatic.com/18840488/r/il/4f7d06/4974215948/il_794xN.4974215948_r6r7.jpg',
        sideimage2='https://i.etsystatic.com/18840488/r/il/6226e5/5022452559/il_794xN.5022452559_gadb.jpg',
        sideimage3='https://i.etsystatic.com/18840488/r/il/a9a450/5022451961/il_794xN.5022451961_hxzk.jpg'
    )

    item_6 = Item(
        user_id=2,
        name='Handmade pet house',
        price=250.00,
        description='High quality luxury handmade pet house. Machine washable!!!',
        mainimage='https://i.etsystatic.com/34165762/r/il/e6a466/4245148795/il_794xN.4245148795_suvn.jpg',
        sideimage='https://i.etsystatic.com/34165762/r/il/709ab6/4245148581/il_794xN.4245148581_dt9s.jpg',
        sideimage2='https://i.etsystatic.com/34165762/r/il/43fdc1/4197489546/il_794xN.4197489546_lt8e.jpg',
        sideimage3='https://i.etsystatic.com/34165762/r/il/2c10d6/4197489574/il_794xN.4197489574_a18t.jpg'
    )

    item_7 = Item(
        user_id=2,
        name='Pet Pillows',
        price=30.00,
        description='3D pillows personalized for your pet',
        mainimage='https://i.etsystatic.com/36381233/r/il/599f99/4494242739/il_794xN.4494242739_rl75.jpg',
        sideimage='https://i.etsystatic.com/36381233/r/il/a58cac/4446897138/il_794xN.4446897138_mc20.jpg',
        sideimage2='https://i.etsystatic.com/36381233/r/il/9bf592/4446895426/il_794xN.4446895426_86bu.jpg',
        sideimage3='https://i.etsystatic.com/36381233/r/il/248944/4446898206/il_794xN.4446898206_k3xm.jpg'
    )

    item_8 = Item(
        user_id=2,
        name='Cat Nest Mat',
        price=50.00,
        description='Cozy spot for your cats.',
        mainimage='https://i.etsystatic.com/8219619/r/il/c0ac0e/5005161906/il_794xN.5005161906_nud1.jpg',
        sideimage='https://i.etsystatic.com/8219619/r/il/d0460b/5053395621/il_794xN.5053395621_hcjg.jpg',
        sideimage2='https://i.etsystatic.com/8219619/r/il/367954/5005161862/il_794xN.5005161862_ovh1.jpg',
        sideimage3='https://i.etsystatic.com/8219619/r/il/9d2e39/5053395585/il_794xN.5053395585_ixw6.jpg'
    )

    item_9 = Item(
        user_id=2,
        name='Woven Cat Nest',
        price=80.00,
        description='Easy to clean and washable. Designed to give your pets sweet sleeping.',
        mainimage='https://i.etsystatic.com/44120819/r/il/4c3712/5109759355/il_794xN.5109759355_87z0.jpg',
        sideimage='https://i.etsystatic.com/44120819/r/il/ef6952/5109759361/il_794xN.5109759361_czds.jpg',
        sideimage2='https://i.etsystatic.com/44120819/r/il/62d18e/5061529994/il_794xN.5061529994_mcsy.jpg',
        sideimage3='https://i.etsystatic.com/44120819/r/il/980fcb/5109759357/il_794xN.5109759357_nsbn.jpg'
    )

    item_10 = Item(
        user_id=2,
        name='Wood Dog toy storage',
        price=190.00,
        description='Handmade bone shape and paw shape toy box. Store all your dog toys here!',
        mainimage='https://i.etsystatic.com/39328126/r/il/01ca05/4691384877/il_794xN.4691384877_6frs.jpg',
        sideimage='https://i.etsystatic.com/39328126/r/il/324e65/4634601617/il_794xN.4634601617_qv60.jpg',
        sideimage2='https://i.etsystatic.com/39328126/r/il/197a34/4634606033/il_794xN.4634606033_9guv.jpg',
        sideimage3='https://i.etsystatic.com/39328126/r/il/11d107/4596435438/il_794xN.4596435438_q1ty.jpg'
    )

    item_11 = Item(
        user_id=3,
        name='Cat Dad mugs',
        price=15.00,
        description='Personalized Cat Dad mugs, Funny Cat Dad Mugs',
        mainimage='https://i.etsystatic.com/28575940/r/il/983010/3736003444/il_794xN.3736003444_gcvh.jpg',
        sideimage='https://i.etsystatic.com/28575940/r/il/3899be/3736003440/il_794xN.3736003440_5naw.jpg',
        sideimage2='https://i.etsystatic.com/iap/8a04c0/5058212868/iap_200x200.5058212868_oayx3xhv.jpg?version=0',
        sideimage3='https://i.etsystatic.com/iap/fb850a/5060636145/iap_200x200.5060636145_gqvuvzr9.jpg?version=0'
    )

    item_12 = Item(
        user_id=3,
        name='Ceramic Cat Pattern cups',
        price=23.00,
        description='200Ml Ceramic Cat pattern cups and saucers set, cute animal ceramic Mug, Kitty Coffe Mug.',
        mainimage='https://i.etsystatic.com/36101048/r/il/c3a987/4404521402/il_794xN.4404521402_fah3.jpg',
        sideimage='https://i.etsystatic.com/36101048/r/il/53d573/4451910783/il_794xN.4451910783_o3jk.jpg',
        sideimage2='https://i.etsystatic.com/36101048/r/il/182504/4451910771/il_794xN.4451910771_65jy.jpg',
        sideimage3='https://i.etsystatic.com/36101048/r/il/540ca1/4451910775/il_794xN.4451910775_ftvw.jpg'
    )

    item_13 = Item(
        user_id=3,
        name='Premium pet water fountain',
        price=26.00,
        description='Premium Pet Water Fountain, Filtered 1.5L Water Dispenser, USB Cats Pet Water Dispenser.',
        mainimage='https://i.etsystatic.com/44266807/r/il/119f50/5032316298/il_794xN.5032316298_agv7.jpg',
        sideimage='https://i.etsystatic.com/44266807/r/il/24d5e8/5032316320/il_794xN.5032316320_bmgl.jpg',
        sideimage2='https://i.etsystatic.com/44266807/r/il/de3e60/5080540007/il_794xN.5080540007_47mk.jpg',
        sideimage3='https://i.etsystatic.com/44266807/r/il/52d698/5080540009/il_794xN.5080540009_otey.jpg'
    )

    item_14 = Item(
        user_id=3,
        name='Kitten stuffed crochet',
        price=29.99,
        description='Handmade, Tabby Crochet cat. Great gift for kids.',
        mainimage='https://i.etsystatic.com/15100548/r/il/6dea8a/3114936396/il_794xN.3114936396_fih5.jpg',
        sideimage='https://i.etsystatic.com/15100548/r/il/5abc22/3162650087/il_794xN.3162650087_7a97.jpg',
        sideimage2='https://i.etsystatic.com/15100548/r/il/04d514/3114935038/il_794xN.3114935038_cod1.jpg',
        sideimage3='https://i.etsystatic.com/15100548/r/il/9a2b14/3113574859/il_794xN.3113574859_r4i9.jpg'
    )

    item_15 = Item(
        user_id=3,
        name='Ceramic Treat Containers',
        price=27.20,
        description='Custom Ceramic Pet treat containers handmade, Treat Jars!',
        mainimage='https://i.etsystatic.com/18188871/r/il/36b680/4046747454/il_794xN.4046747454_6urd.jpg',
        sideimage='https://i.etsystatic.com/18188871/r/il/ecdc17/4094396905/il_794xN.4094396905_542u.jpg',
        sideimage2='https://i.etsystatic.com/18188871/r/il/920b0f/4094397189/il_794xN.4094397189_1oc5.jpg',
        sideimage3='https://i.etsystatic.com/18188871/r/il/d6d24a/4094397037/il_794xN.4094397037_lw55.jpg'
    )

    db.session.add(item_1)
    db.session.add(item_2)
    db.session.add(item_3)
    db.session.add(item_4)
    db.session.add(item_5)
    db.session.add(item_6)
    db.session.add(item_7)
    db.session.add(item_8)
    db.session.add(item_9)
    db.session.add(item_10)
    db.session.add(item_11)
    db.session.add(item_12)
    db.session.add(item_13)
    db.session.add(item_14)
    db.session.add(item_15)
    db.session.commit()

def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
